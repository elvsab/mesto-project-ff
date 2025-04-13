(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"0a1e9cab-1b5c-4ac2-9d99-147a29b27728","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function r(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers}).then(t)}function n(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then(t)}function o(e,t,r,n,o){(e.classList.contains("card__like-button_is-active")?o(r):n(r)).then((function(r){e.classList.toggle("card__like-button_is-active"),t.textContent=r.likes.length})).catch(console.error)}function c(e,t){var r=t.handleDelete,n=t.handleLike,o=t.handlePreview,c=t.currentUserId,a=t.likeCard,u=t.unlikeCard,i=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=i.querySelector(".card__image"),s=i.querySelector(".card__title"),d=i.querySelector(".card__delete-button"),p=i.querySelector(".card__like-button"),f=i.querySelector(".card__like-count");return f.textContent=e.likes.length,l.src=e.link,l.alt=e.name,s.textContent=e.name,e.owner._id===c?d.addEventListener("click",(function(){return r(i,e._id)})):d.remove(),e.likes.some((function(e){return e._id===c}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){n(p,f,e._id,a,u)})),l.addEventListener("click",(function(){o(e.link,e.name)})),i}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}var l=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},s=function(e,t,r){e.some((function(e){return!e.validity.valid}))?(t.classList.add(r.inactiveButtonClass),t.disabled=!0):(t.classList.remove(r.inactiveButtonClass),t.disabled=!1)},d=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){l(e,r,t)})),s(r,n,t)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}document.querySelector(".header__logo").src="fc3e6875d825f899a98d.svg";var f=document.querySelector(".profile__image"),_=document.querySelector(".popup_type_image"),m=_.querySelector(".popup__image"),y=_.querySelector(".popup__caption"),v=document.querySelector(".popup_type_confirm"),h=v.querySelector(".popup__form");function S(e,t){m.src=e,m.alt=t,y.textContent=t,a(_)}var b=document.querySelector(".places__list"),q="",k=null,L=null;Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,a,u=(a=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,a)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(t,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=u[0],l=u[1];I.textContent=i.name,T.textContent=i.about,f.style.backgroundImage="url(".concat(i.avatar,")"),q=i._id,l.reverse().forEach((function(e){var t=c(e,{handleDelete:z,handleLike:o,handlePreview:S,currentUserId:q,likeCard:r,unlikeCard:n});b.append(t)}))})).catch((function(e){console.error("Ошибка при загрузке данных с сервера:",e)})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close"))&&u(e)}))}));var C=document.querySelector(".profile__edit-button"),E=document.querySelector(".popup_type_edit");C.addEventListener("click",(function(){D.value=I.textContent,P.value=T.textContent,d(B,J),a(E)}));var g=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup__input_type_card-name"),U=document.querySelector(".popup__input_type_url"),w=document.querySelector(".popup_type_new-card .popup__form");w.addEventListener("submit",(function(a){a.preventDefault();var i,l,s=x.value,d=U.value,p=w.querySelector(J.submitButtonSelector);H(!0,p),(i=s,l=d,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:i,link:l})}).then(t)).then((function(e){var t=c(e,{handleDelete:z,handleLike:o,handlePreview:S,currentUserId:q,likeCard:r,unlikeCard:n});b.prepend(t),u(A),w.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){H(!1,p)}))})),g.addEventListener("click",(function(){w.reset(),d(w,J),a(A)})),document.querySelector(".popup__form");var B=document.querySelector(".popup_type_edit .popup__form"),D=(document.querySelectorAll(".popup__input"),document.querySelector(".popup__input_type_name")),P=document.querySelector(".popup__input_type_description"),I=document.querySelector(".profile__title"),T=document.querySelector(".profile__description");document.querySelector(".popup__button");var j=document.querySelector(".profile__avatar-edit-button"),O=document.querySelector(".popup_type_avatar"),M=document.forms["update-avatar"],N=M.querySelector(".popup__input_type_avatar");j.addEventListener("click",(function(){M.reset(),d(M,J),a(O)})),M.addEventListener("submit",(function(r){r.preventDefault();var n,o=M.querySelector(J.submitButtonSelector);H(!0,o),(n=N.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)).then((function(e){f.style.backgroundImage="url(".concat(e.avatar,")"),u(O)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){H(!1,o)}))})),B.addEventListener("submit",(function(r){r.preventDefault();var n=D.value,o=P.value,c=B.querySelector(J.submitButtonSelector);H(!0,c),function(r,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:n})}).then(t)}(n,o).then((function(e){I.textContent=e.name,T.textContent=e.about,u(E)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){H(!1,c)}))}));var J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};h.addEventListener("submit",(function(r){var n;r.preventDefault(),k&&L&&(n=L,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)).then((function(){k.remove(),u(v)})).catch((function(e){console.error("Ошибка при удалении карточки:",e)})).finally((function(){k=null,L=null}))}));var H=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";t.textContent=e?"Сохранение...":r};function z(e,t){k=e,L=t,a(v)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);s(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.valid?l(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validity.patternMismatch?t.dataset.errorMessage:t.validationMessage,r)}(e,o,t),s(r,n,t)}))}))}(t,e)}))}(J)})();