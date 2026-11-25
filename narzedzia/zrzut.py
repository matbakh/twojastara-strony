import sys, asyncio, json
from playwright.async_api import async_playwright
# użycie: zrzut.py URL wyjscie.png szerokosc wysokosc [klucz_sesji] [pelna=1]
url, wyj = sys.argv[1], sys.argv[2]
w, h = int(sys.argv[3]), int(sys.argv[4])
klucz = sys.argv[5] if len(sys.argv) > 5 and sys.argv[5] != '-' else None
pelna = (sys.argv[6] if len(sys.argv) > 6 else '1') == '1'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, is_mobile=w < 700, has_touch=w < 700, locale='pl-PL', timezone_id='Europe/Warsaw')
        pg = await ctx.new_page()
        bledy = []
        pg.on('console', lambda m: bledy.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
        pg.on('pageerror', lambda e: bledy.append(f'pageerror: {e}'))
        if klucz:
            await pg.add_init_script(f"try{{sessionStorage.setItem('{klucz}','1')}}catch(e){{}}")
        await pg.goto(url, wait_until='networkidle')
        await pg.wait_for_timeout(500)
        await pg.evaluate("document.querySelectorAll('[data-pokaz]').forEach(e=>e.classList.add('widoczny'))")
        await pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);}")
        await pg.wait_for_timeout(600)
        await pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')")
        try:
            await pg.wait_for_function("[...document.images].every(i=>i.complete)", timeout=15000)
        except Exception as e:
            print('UWAGA: nie wszystkie zdjęcia się wczytały')
        await pg.wait_for_timeout(400)
        info = await pg.evaluate("""()=>{
          const vw=document.documentElement.clientWidth; const out=[];
          document.querySelectorAll('body *').forEach(el=>{const r=el.getBoundingClientRect(); if(r.width>0 && (r.right>vw+1 || r.left<-1)){ const s=getComputedStyle(el); if(s.position!=='fixed') out.push((el.tagName+'.'+(el.className&&el.className.baseVal===undefined?el.className:'')).slice(0,90)+' L'+Math.round(r.left)+' R'+Math.round(r.right));}});
          const tekst=[];document.querySelectorAll('h1,h2,h3,p,a,li,button,span,summary,dd,dt').forEach(el=>{ if(el.clientWidth>0 && el.scrollWidth>el.clientWidth+2 && getComputedStyle(el).overflowX==='visible' && getComputedStyle(el).display!=='inline') tekst.push(el.tagName+':'+(el.innerText||'').replace(/\s+/g,' ').slice(0,40)+' sw'+el.scrollWidth+' cw'+el.clientWidth)});
          return {scrollW: document.documentElement.scrollWidth, clientW: vw, height: document.documentElement.scrollHeight, overflow: out.slice(0,12), tekst: tekst.slice(0,12)};
        }""")
        print(json.dumps(info, ensure_ascii=False))
        for x in bledy[:15]: print('KONSOLA', x)
        await pg.screenshot(path=wyj, full_page=pelna)
        await b.close()
asyncio.run(main())
