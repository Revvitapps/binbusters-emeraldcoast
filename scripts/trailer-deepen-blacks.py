import sys, numpy as np, cv2
from PIL import Image
im = np.array(Image.open(sys.argv[1]).convert('RGBA'))
rgb = im[:,:,:3].astype(np.float32)/255
hsv = cv2.cvtColor(im[:,:,:3], cv2.COLOR_RGB2HSV).astype(np.float32)
s = hsv[...,1]/255; v = hsv[...,2]/255
lum = (rgb*[0.299,0.587,0.114]).sum(2)
# weight: neutral and darkish
w = np.clip((0.30-s)/0.12,0,1) * np.clip((0.68-v)/0.12,0,1)
# protect stainless tank except near-black frame
tank = np.zeros(v.shape,bool); tank[195:640,815:1075]=True
w[tank & (v>0.32)] = 0
# protect white wrap panel text region? keep (darkening text is fine)
w = cv2.GaussianBlur(w,(0,0),1.2)
# local contrast on luminance
L = (lum*255).astype(np.uint8)
clahe = cv2.createCLAHE(clipLimit=2.0,tileGridSize=(16,16))
Lc = clahe.apply(L).astype(np.float32)/255
Lm = 0.6*lum+0.4*Lc
# tone curve: deep blacks, keep specular
t = np.clip(Lm,0,1)
newL = 0.03 + 0.97*np.power(t,1.75)
# gloss: lift top highlights slightly
newL = newL + 0.15*np.clip((t-0.55)/0.25,0,1)*t
out_dark = np.repeat(newL[...,None],3,2)
# tiny cool tint like new rubber/paint
out_dark = out_dark*np.array([0.97,0.985,1.0])
W = w[...,None]
res = rgb*(1-W)+out_dark*W
o = im.copy(); o[:,:,:3] = np.clip(res*255,0,255).astype(np.uint8)
Image.fromarray(o).save(sys.argv[2], optimize=True)
