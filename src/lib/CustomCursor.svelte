<script lang="ts">
  import { onMount } from 'svelte';
  let wrapper: HTMLDivElement;
  
  onMount(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.matchMedia('(max-width:768px)').matches) return;
    
    document.body.classList.add('has-custom-cursor');
    let raf: number;
    
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrapper.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;opacity:1`;
      });
    };
    
    const hover = (on: boolean) => () => {
      on ? wrapper.classList.add('hovering') : wrapper.classList.remove('hovering');
    };
    
    document.addEventListener('mousemove', move, { passive: true });
    document.querySelectorAll('a,button,[role=button]').forEach(el => {
      el.addEventListener('mouseenter', hover(true));
      el.addEventListener('mouseleave', hover(false));
    });
    
    return () => {
      document.removeEventListener('mousemove', move);
      document.body.classList.remove('has-custom-cursor');
    };
  });
</script>

<!-- Always in DOM, opacity 0 until first move -->
<div bind:this={wrapper} class="tcw" aria-hidden="true">
  <div class="tcd"></div>
  <div class="tcc tl"></div>
  <div class="tcc tr"></div>
  <div class="tcc br"></div>
  <div class="tcc bl"></div>
</div>

<style>
  :global(body.has-custom-cursor), :global(body.has-custom-cursor *) { cursor: none !important; }
  .tcw { position:fixed; top:0; left:0; width:0; height:0; pointer-events:none; z-index:99999; transform:translate(-50%,-50%); opacity:0; transition:opacity 0.2s; }
  .tcd { position:absolute; left:50%; top:50%; width:5px; height:5px; background:#22c55e; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 10px #22c55ecc,0 0 20px #22c55e66; }
  .tcc { position:absolute; left:50%; top:50%; width:13px; height:13px; border:2px solid #22c55e; filter:drop-shadow(0 0 3px rgba(34,197,94,.6)); transition:all 0.12s ease; }
  .tl { transform:translate(-150%,-150%); border-right:none; border-bottom:none; }
  .tr { transform:translate(50%,-150%); border-left:none; border-bottom:none; }
  .br { transform:translate(50%,50%); border-left:none; border-top:none; }
  .bl { transform:translate(-150%,50%); border-right:none; border-top:none; }
  .tcw.hovering .tcc { width:18px; height:18px; }
  .tcw.hovering .tl { transform:translate(-180%,-180%); }
  .tcw.hovering .tr { transform:translate(80%,-180%); }
  .tcw.hovering .br { transform:translate(80%,80%); }
  .tcw.hovering .bl { transform:translate(-180%,80%); }
</style>
