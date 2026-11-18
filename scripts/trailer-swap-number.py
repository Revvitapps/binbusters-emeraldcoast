import sys, numpy as np, cv2
from PIL import Image
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert('RGBA'))
rgb = im[:,:,:3].astype(np.float32)
x0,y0,x1,y1 = 490,440,820,507
gray = rgb[...,:].mean(2)
reg = gray[y0:y1,x0:x1]
lab,n = ndimage.label(reg<140)
comps=[]
for i,sl in enumerate(ndimage.find_objects(lab)):
    a=(lab[sl]==i+1).sum()
    if a>100: comps.append((sl[1].start+x0, sl[0].start+y0, sl[1].stop+x0, sl[0].stop+y0, i+1))
comps.sort()
assert len(comps)==12, comps
P=3
# ink alpha 0..1 relative to paper/ink levels
paper = np.median(gray[440:445,490:820]); inkv = np.percentile(reg,1)
print('paper',paper,'ink',inkv)
def glyph(c, rot=False):
    gx0,gy0,gx1,gy1,_=c
    g = gray[gy0-P:gy1+P, gx0-P:gx1+P]
    a = np.clip((paper-g)/(paper-inkv),0,1)
    if rot: a = a[::-1,::-1]
    return a
old = "530-228-7046"; new = "850-396-2908"
pick = {}
for ch,c in zip(old,comps): pick.setdefault(ch,c)
# area to clear: union of all digit boxes, padded
mask = np.zeros(gray.shape,np.uint8)
for c in comps:
    gx0,gy0,gx1,gy1,_=c; mask[gy0-P:gy1+P, gx0-P:gx1+P]=255
# keep the URL line below safe: only clear pixels darker than threshold-ish plus dilation
inkmask = ((gray<200)&(mask>0)).astype(np.uint8)*255
inkmask = cv2.dilate(inkmask,np.ones((5,5),np.uint8))
inkmask &= mask
bgr = cv2.cvtColor(im[:,:,:3],cv2.COLOR_RGB2BGR)
clean = cv2.inpaint(bgr,inkmask,5,cv2.INPAINT_TELEA)
clean = cv2.cvtColor(clean,cv2.COLOR_BGR2RGB).astype(np.float32)
# ink colour
inkcol = np.median(rgb[y0:y1,x0:x1][reg<inkv+15],axis=0)
for ch_old,ch_new,slot in zip(old,new,comps):
    if ch_old==ch_new:
        a = glyph(slot)
    elif ch_new=='9':
        a = glyph(pick['6'],rot=True)
    else:
        a = glyph(pick[ch_new])
    sx0,sy0,sx1,sy1,_=slot
    cx=(sx0+sx1)/2; by=sy1  # align bottom, centre horizontally
    if ch_new=='9': by = sy1  # 9 has same height as 6
    h,w=a.shape
    tx=int(round(cx-w/2)); ty=int(round(by+P-h))
    region = clean[ty:ty+h, tx:tx+w]
    A=a[...,None]
    clean[ty:ty+h, tx:tx+w] = region*(1-A)+inkcol*A
res = im.copy(); res[:,:,:3]=np.clip(clean,0,255).astype(np.uint8)
Image.fromarray(res).save(out, optimize=True)
