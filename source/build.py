# Build smAisle Run. Edit source/, then run: python3 source/build.py
# NAME is the one place the game's name lives. Change it here and rebuild.
import json,pathlib,re
NAME='smAisle Run'
d=pathlib.Path(__file__).parent
s=(d/'src.html').read_text()
g=(d/'game.js').read_text()
s=s.replace('/*ICONS*/',(d/'icons.js').read_text()).replace('/*STORES*/',(d/'stores.js').read_text()).replace('/*PUZZLE*/',(d/'puzzle.js').read_text()).replace('/*ART*/',(d/'art.js').read_text())
s=s.replace('/*SOUNDLIB*/',(d/'sound.js').read_text()).replace('/*GAME*/',g).replace('{{NAME}}',NAME)
s=s.replace('/*DEMOCSS*/',(d/'demo-frame.css').read_text().strip()).replace('/*DEMOJS*/',(d/'demo-frame.js').read_text().strip())
(d.parent/'index.html').write_text(s)
art=re.sub(r'<link rel="(manifest|apple-touch-icon|icon)"[^>]*>\n','',s)
(d.parent/'index-artifact.html').write_text(art)
(d.parent/'owner.html').write_text((d/'owner.html').read_text().replace('{{NAME}}',NAME))
(d.parent/'manifest.json').write_text(json.dumps({'name':NAME,'short_name':NAME,'start_url':'./','display':'standalone','background_color':'#f4efe1','theme_color':'#f4efe1','icons':[{'src':'icon-192.png','sizes':'192x192','type':'image/png'},{'src':'icon-512.png','sizes':'512x512','type':'image/png'}]},separators=(',',':'))+'\n')
print(len(s))
