import{a as q,S as v,i as a}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const B="50855680-e7e32480db9ff9b763cd16451",M="https://pixabay.com/api/";async function p(o,t){const s={key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};try{return(await q.get(M,{params:s})).data}catch(i){throw console.error("Error fetching data from Pixabay API:",i),i}}const f=document.querySelector(".gallery"),g=document.querySelector(".load-more-btn"),h=document.querySelector(".loader");let $=new v(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const t=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:n,comments:E,downloads:P})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${s}" alt="${e}" width='360'/>
        </a>
        <ul class='list'>
          <li class='item'>
            <span>Likes</span>
            <span>${r}</span>
          </li>
          <li class='item'>
            <span>Views</span>
            <span>${n}</span>
          </li>
          <li class='item'>
            <span>Comments</span>
            <span>${E}</span>
          </li>
          <li class='item'>
            <span>Downloads</span>
            <span>${P}</span>
          </li>
        </ul>
      </li>`).join("");f.insertAdjacentHTML("beforeend",t),$.refresh()}function m(){f.innerHTML=""}function L(){g.classList.remove("is-hidden")}function l(){g.classList.add("is-hidden")}function w(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}const R=document.querySelector(".form"),I=document.querySelector(".load-more-btn");let d="",c=1;const u=15;let S=0;R.addEventListener("submit",async o=>{if(o.preventDefault(),d=o.currentTarget.elements.searchQuery.value.trim(),!d){m(),l();return}c=1,m(),l(),w();try{const{hits:t,totalHits:s}=await p(d,c,u);if(t.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(t),S=Math.ceil(s/u),s<=u?(l(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch(t){a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",t.message)}finally{b()}});I.addEventListener("click",async()=>{c+=1,l(),w();try{const{hits:o}=await p(d,c,u);y(o),c>=S?(l(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(o){a.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"}),console.error("Error loading more images:",o.message)}finally{b()}});
//# sourceMappingURL=index.js.map
