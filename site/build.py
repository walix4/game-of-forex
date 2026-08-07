#!/usr/bin/env python3
"""EZE Funded — static site builder.
Assembles each page in pages/*.page.html into a full standalone HTML file
by injecting shared head/style/sprite/nav/footer/script partials.

Page file format (pages/NAME.page.html):
    <!--TITLE: ... -->
    <!--DESC: ... -->
    <!--NAV: challenge -->        (which nav item is active; blank = none)
    ...page body HTML (goes between </nav> and <footer>)...
"""
import os, re, glob, sys

ROOT=os.path.dirname(os.path.abspath(__file__))
P=os.path.join(ROOT,'partials')
OUT=os.path.join(ROOT,'dist')
os.makedirs(OUT,exist_ok=True)

def read(f): return open(os.path.join(P,f),encoding='utf-8').read()
head=read('head.html'); style=read('style.html'); sprite=read('sprite.html')
nav=read('nav.html'); footer=read('footer.html'); script=read('script.html')

def meta(src,key,default=''):
    m=re.search(r'<!--'+key+r':(.*?)-->',src,re.S)
    return m.group(1).strip() if m else default

pages=sorted(glob.glob(os.path.join(ROOT,'pages','*.page.html')))
built=[]
for pf in pages:
    src=open(pf,encoding='utf-8').read()
    name=os.path.basename(pf).replace('.page.html','')
    title=meta(src,'TITLE',"EZE Funded")
    desc=meta(src,'DESC',"World's first A-Book prop firm with instant payouts.")
    active=meta(src,'NAV','')
    body=re.sub(r'<!--(TITLE|DESC|NAV):.*?-->','',src,flags=re.S).strip()

    h=head.replace('__TITLE__',title).replace('__DESC__',desc).replace('__STYLE__',style)
    # active nav state
    n=nav
    if active:
        n=n.replace('data-nav="%s"'%active, 'data-nav="%s" class="on"'%active)
    page=('<!DOCTYPE html>\n<html lang="en">\n'+h+'\n<body>\n'
          +sprite+'\n'+n+'\n'+body+'\n'+footer+'\n'+script+'\n</body>\n</html>\n')
    outp=os.path.join(OUT,name+'.html')
    open(outp,'w',encoding='utf-8').write(page)
    built.append((name,len(page)))

# copy static assets (favicon etc.)
import shutil
for a in ['favicon.svg']:
    s=os.path.join(ROOT,'assets',a)
    if os.path.exists(s): shutil.copy(s,os.path.join(OUT,a))

print('Built %d pages -> dist/'%len(built))
for n,sz in built: print('  %-16s %d KB'%(n+'.html',sz//1024))
