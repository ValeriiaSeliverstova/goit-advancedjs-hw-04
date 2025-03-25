import{a as d,i as u,S as v}from"./assets/vendor-BBSqv8W6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();d.defaults.baseURL="https://pixabay.com/api/";d.defaults.params={key:"49479304-89a48f16eaa5319308b7de96a",per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0};function b(){document.querySelector(".loader").style.display="block"}function q(){document.querySelector(".loader").style.display="none"}async function m(a,r){b();try{const{data:t}=await d.get("",{params:{q:a,page:r}}),s=Math.ceil(t.totalHits/d.defaults.params.per_page);return{images:t.hits,totalPages:s}}catch(t){throw console.error("Error fetching data: ",t),t}finally{q()}}let y=null;function p(a){if(!a||a.length===0)return u.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!"});const r=document.querySelector(".gallery"),t=a.map(({webformatURL:s,largeImageURL:e,tags:o,likes:n,views:h,comments:f,downloads:g})=>`<li class="gallery-item">
	<a class="gallery-link" href="${e}">
		<img
			class="gallery-image"
			src="${s}"
			alt="${o}"
			/>
	</a>
    <div class="info">
        <div class="info-item">
            <h3>Likes</h3>
            <p>${n}</p>
        </div>
        <div class="info-item">
            <h3>Views</h3>
            <p>${h}</p>
        </div>
        <div class="info-item">
            <h3>Comments</h3>
            <p>${f}</p>
        </div>
        <div class="info-item">
            <h3>Downloads</h3>
            <p>${g}</p>
        </div> 
    </div>
</li>`).join("");r.insertAdjacentHTML("beforeend",t),y=new v(".gallery-link",{captionsData:"alt",captionDelay:250,overlay:!0,overlayOpacity:.8}),y.refresh()}const L=document.querySelector(".form"),w=document.querySelector('input[name="search-input"]'),l=document.querySelector(".load-more"),S=document.querySelector(".gallery");let i=1,c="";L.addEventListener("submit",a=>{if(a.preventDefault(),S.innerHTML="",l.style.display="none",c=w.value.trim(),!c)return u.error({title:"",message:"Please enter a search query!"});i=1,m(c,i).then(({images:r,totalPages:t})=>{p(r),console.log(t),i<t?l.style.display="block":l.style.display="none";const s=document.querySelector(".gallery-item"),{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}).catch(r=>{throw r.message})});l.addEventListener("click",()=>{i+=1,m(c,i).then(({images:a,totalPages:r})=>{p(a),i<r?l.style.display="block":(l.style.display="none",u.info({title:"",message:"We're sorry, but you've reached the end of search results."}));const t=document.querySelector(".gallery-item"),{height:s}=t.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}).catch(a=>{throw a.message})});
//# sourceMappingURL=index.js.map
