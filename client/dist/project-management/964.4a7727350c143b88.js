"use strict";(self.webpackChunkProject_Management=self.webpackChunkProject_Management||[]).push([[964],{4964:(I,m,s)=>{s.r(m),s.d(m,{AuthModule:()=>k});var g=s(6895),o=s(4006),l=s(3792),e=s(4650),u=s(384);const p=function(n){return[n]};function x(n,r){if(1&n&&e._UZ(0,"input",11),2&n){const t=e.oxw();let i;e.Q6J("ngClass",e.VKq(1,p,null!=(i=t.loginForm.get("name"))&&i.invalid&&null!=(i=t.loginForm.get("name"))&&i.touched?"invalid-input":""))}}function C(n,r){1&n&&(e.TgZ(0,"p"),e._uU(1," Not a member? "),e.TgZ(2,"a",12),e._uU(3,"register"),e.qZA()())}function _(n,r){1&n&&(e.TgZ(0,"p"),e._uU(1," Already a member? "),e.TgZ(2,"a",13),e._uU(3,"login"),e.qZA()())}let d=(()=>{class n{constructor(t,i){this.auth=t,this.route=i,this.formError=!1,this.formErrorMessage="Please fill all the fields",this.isLogin=!0,this.loginForm=new o.cw({})}ngOnInit(){"register"===this.route.snapshot.url[0].path&&(this.isLogin=!1),"login"===this.route.snapshot.url[0].path&&(this.isLogin=!0),this.initForm(),this.auth.getErrorMessageListener().subscribe(t=>{this.formError=!0,this.formErrorMessage=t,console.log(t),setTimeout(()=>{this.formError=!1,this.formErrorMessage="Please fill all the fields"},3e3)})}initForm(){this.loginForm=new o.cw(this.isLogin?{email:new o.NI("",[o.kI.required,o.kI.email]),password:new o.NI("",[o.kI.required,o.kI.minLength(6)])}:{name:new o.NI("",[o.kI.required]),email:new o.NI("",[o.kI.required,o.kI.email]),password:new o.NI("",[o.kI.required,o.kI.minLength(6)])})}onSubmit(){if(this.loginForm.invalid)return this.formError=!0,console.log("invalid"),void setTimeout(()=>{this.formError=!1},3e3);this.isLogin?this.auth.login({_id:null,name:null,email:this.loginForm.value.email,password:this.loginForm.value.password,imageUrl:"",token:null}):this.auth.register({_id:null,name:this.loginForm.value.name,email:this.loginForm.value.email,password:this.loginForm.value.password,imageUrl:"",token:null})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(u.e),e.Y36(l.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:16,vars:15,consts:[[1,"container"],["src","assets/images/auth-cover.svg","alt","Register"],[3,"formGroup","submit"],[1,"error-msg",3,"ngClass"],[1,"inputs"],["type","text","placeholder","Name","formControlName","name",3,"ngClass",4,"ngIf"],["type","text","placeholder","Email","formControlName","email",3,"ngClass"],["type","password","placeholder","Password","formControlName","password",3,"ngClass"],[1,"register"],["type","submit",1,"btn"],[4,"ngIf"],["type","text","placeholder","Name","formControlName","name",3,"ngClass"],["routerLink","/auth/register"],["routerLink","/auth/login"]],template:function(t,i){if(1&t&&(e.TgZ(0,"div",0),e._UZ(1,"img",1),e.TgZ(2,"form",2),e.NdJ("submit",function(){return i.onSubmit()}),e.TgZ(3,"h3"),e._uU(4,"Project Management"),e.qZA(),e.TgZ(5,"div",3),e._uU(6),e.qZA(),e.TgZ(7,"div",4),e.YNc(8,x,1,3,"input",5),e._UZ(9,"input",6)(10,"input",7),e.TgZ(11,"div",8)(12,"button",9),e._uU(13),e.qZA(),e.YNc(14,C,4,0,"p",10),e.YNc(15,_,4,0,"p",10),e.qZA()()()()),2&t){let a;e.xp6(2),e.Q6J("formGroup",i.loginForm),e.xp6(3),e.Q6J("ngClass",e.VKq(9,p,i.formError?"error-msg-show":"")),e.xp6(1),e.hij(" ",i.formErrorMessage," "),e.xp6(2),e.Q6J("ngIf",!i.isLogin),e.xp6(1),e.Q6J("ngClass",e.VKq(11,p,null!=(a=i.loginForm.get("email"))&&a.invalid&&null!=(a=i.loginForm.get("email"))&&a.touched?"invalid-input":"")),e.xp6(1),e.Q6J("ngClass",e.VKq(13,p,i.loginForm.get("password").invalid&&i.loginForm.get("password").touched?"invalid-input":"")),e.xp6(3),e.hij(" ",i.isLogin?"Login":"Register"," "),e.xp6(1),e.Q6J("ngIf",i.isLogin),e.xp6(1),e.Q6J("ngIf",!i.isLogin)}},dependencies:[g.mk,g.O5,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,l.yS],styles:[".container[_ngcontent-%COMP%]{height:calc(100vh - 7rem);display:grid;grid-template-columns:1fr 1fr;justify-content:center;align-content:center;width:1200px;margin:auto;gap:100px}.container[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:500px;margin:auto}form[_ngcontent-%COMP%]{background-color:#8f8f8f;width:80%;border-radius:10px;overflow:hidden;box-shadow:0 4px 4px #0000001a;padding-bottom:10px}form[_ngcontent-%COMP%] > h3[_ngcontent-%COMP%]{background-color:#504f4f;padding:20px 10px;text-align:center;color:#fff;font-size:20px}.inputs[_ngcontent-%COMP%]{display:grid;gap:40px;background-color:transparent;border:none;width:80%;margin-top:30px;margin-left:auto;margin-right:auto}input[_ngcontent-%COMP%]{padding:10px 15px;background-color:#d9d9d9;border-radius:10px;font-size:17px;box-shadow:0 4px 4px #0000001a}.register[_ngcontent-%COMP%]{display:grid;gap:10px;background-color:transparent}.btn[_ngcontent-%COMP%]{color:#000;background-color:#d9d9d9;padding:8px 10px;border-radius:20px;font-size:17px;width:100px;margin:auto;box-shadow:0 4px 4px #0000001a}p[_ngcontent-%COMP%]{text-align:center;color:#fff}a[_ngcontent-%COMP%]{text-decoration:underline;color:#fff}.error-msg[_ngcontent-%COMP%]{display:none;color:#d46161;font-size:15px;margin:30px 30px 0;padding:10px 20px;text-align:center;background-color:#f3c9c9}.error-msg-show[_ngcontent-%COMP%]{display:block}@media screen and (max-width: 1200px){.container[_ngcontent-%COMP%]{grid-template-columns:1fr;width:100%}form[_ngcontent-%COMP%]{width:95%;margin:auto}.container[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:none}input[_ngcontent-%COMP%]{font-size:15px}}@media screen and (max-width: 400px){form[_ngcontent-%COMP%] > h3[_ngcontent-%COMP%]{font-size:18px}.btn[_ngcontent-%COMP%], p[_ngcontent-%COMP%], a[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{font-size:13px}}@media screen and (max-width: 280px){form[_ngcontent-%COMP%] > h3[_ngcontent-%COMP%]{font-size:15px}.btn[_ngcontent-%COMP%], p[_ngcontent-%COMP%], a[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{font-size:13px}}"]}),n})();var c=s(5696),h=s(8379),b=s(5867),f=s(1572);function M(n,r){1&n&&e._UZ(0,"mat-spinner",16)}function P(n,r){1&n&&(e.TgZ(0,"p"),e._uU(1,"Pick Image"),e.qZA())}function w(n,r){if(1&n&&e._UZ(0,"img",17),2&n){const t=e.oxw();e.Q6J("src",t.imagePicked,e.LSH)}}const v=function(){return["/"]},O=[{path:"",redirectTo:"/auth/login",pathMatch:"full"},{path:"login",component:d},{path:"register",component:d},{path:"update",component:(()=>{class n{constructor(t,i,a){this.store=t,this.authService=i,this.router=a,this.getImageURL=c.Q,this.isLoading=!1,this.imagePicked="",this.imageFile=null,this.updateForm=new o.cw({name:new o.NI(null,{validators:[o.kI.required,o.kI.minLength(3)]}),email:new o.NI(null,{validators:[o.kI.required,o.kI.email]}),image:new o.NI(null,{validators:[o.kI.required]})})}ngOnInit(){this.store.select("auth").subscribe(t=>{this.updateForm.setValue({name:t.user.name,email:t.user.email,image:null}),this.updateForm.get("email")?.disable(),this.updateForm.get("image")?.updateValueAndValidity(),this.imagePicked=(0,c.Q)(t.user.imageUrl)})}handleFileInput(t){if(("image/png"===t.target.files[0]?.type||"image/jpeg"===t.target.files[0]?.type)&&t.target.files&&t.target.files.length){var i=new FileReader;i.onload=()=>{this.imagePicked=i.result,this.updateForm.get("image")?.updateValueAndValidity()},i.readAsDataURL(t.target.files[0]),this.imageFile=t.target.files[0]}}onSubmit(){if(this.updateForm.get("name").invalid||this.updateForm.get("email").invalid)return;this.isLoading=!0;const t=this.updateForm.get("name").value,i=this.updateForm.get("email").value;return this.imageFile?(console.log(this.updateForm.value,this.imageFile),void this.authService.updateUser(t,i,this.imageFile).subscribe(a=>{console.log(a),this.store.dispatch((0,h.BN)({user:a.user})),this.authService.updateLocalStorage(a.user),this.isLoading=!1,this.router.navigate(["/"])})):this.imageFile?void 0:(console.log(this.updateForm.value,this.imagePicked),void this.authService.updateUser(t,i,this.imagePicked).subscribe(a=>{console.log(a),this.store.dispatch((0,h.BN)({user:a.user})),this.authService.updateLocalStorage(a.user),this.isLoading=!1,this.router.navigate(["/"])}))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(b.yh),e.Y36(u.e),e.Y36(l.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-update"]],decls:27,vars:6,consts:[[1,"container"],[3,"formGroup","submit"],["style","display: flex; margin: auto",4,"ngIf"],[1,"inputs"],[1,"input"],["for",""],["type","text","formControlName","name","placeholder","Name","value","John"],["type","text","formControlName","email","placeholder","Email","value","John"],["for","upload",1,"pick-image"],["pickImage",""],[4,"ngIf"],["alt","Project Image",3,"src",4,"ngIf"],["type","file","id","upload","formControlName","image","accept","image/png, image/gif, image/jpeg",2,"display","none",3,"change"],[1,"btns"],["type","submit",1,"btn"],["type","button",1,"btn",3,"routerLink"],[2,"display","flex","margin","auto"],["alt","Project Image",3,"src"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("submit",function(){return i.onSubmit()}),e.TgZ(2,"h3"),e._uU(3,"My Profile"),e.qZA(),e.YNc(4,M,1,0,"mat-spinner",2),e.TgZ(5,"div",3)(6,"div",4)(7,"label",5),e._uU(8,"Name"),e.qZA(),e._UZ(9,"input",6),e.qZA(),e.TgZ(10,"div",4)(11,"label",5),e._uU(12,"Email"),e.qZA(),e._UZ(13,"input",7),e.qZA(),e.TgZ(14,"div",4)(15,"label",5),e._uU(16,"Image"),e.qZA(),e.TgZ(17,"label",8,9),e.YNc(19,P,2,0,"p",10),e.YNc(20,w,1,1,"img",11),e.TgZ(21,"input",12),e.NdJ("change",function(F){return i.handleFileInput(F)}),e.qZA()()()(),e.TgZ(22,"div",13)(23,"button",14),e._uU(24,"Update"),e.qZA(),e.TgZ(25,"button",15),e._uU(26,"Cancel"),e.qZA()()()()),2&t&&(e.xp6(1),e.Q6J("formGroup",i.updateForm),e.xp6(3),e.Q6J("ngIf",i.isLoading),e.xp6(15),e.Q6J("ngIf",!i.imagePicked),e.xp6(1),e.Q6J("ngIf",i.imagePicked),e.xp6(5),e.Q6J("routerLink",e.DdM(5,v)))},dependencies:[g.O5,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,l.rH,f.Ou],styles:[".container[_ngcontent-%COMP%]{height:calc(100vh - 7rem);display:flex;justify-content:center;align-content:center;max-width:600px;width:90%;margin:40px auto 0}form[_ngcontent-%COMP%]{background-color:#d9d9d9;width:100%;border-radius:10px;overflow:hidden;box-shadow:0 4px 4px #0000001a;margin:auto;display:grid}form[_ngcontent-%COMP%] > h3[_ngcontent-%COMP%]{padding:20px 10px;text-align:center;color:#3f484e;font-size:25px}.inputs[_ngcontent-%COMP%]{display:grid;gap:40px;background-color:transparent;border:none;width:80%;margin:30px auto 15px}.input[_ngcontent-%COMP%]{display:flex;align-items:center;gap:20px}input[_ngcontent-%COMP%]{width:100%;padding:10px 15px;background-color:#fff;border-radius:10px;box-shadow:0 4px 4px #0000001a}.error-msg[_ngcontent-%COMP%]{display:none;color:#d46161;font-size:15px;margin:30px 30px 0;padding:10px 20px;text-align:center;background-color:#f3c9c9}.error-msg-show[_ngcontent-%COMP%]{display:block}.pick-image[_ngcontent-%COMP%]{height:300px;background-color:#fff;display:grid;cursor:pointer;border-radius:10px;box-shadow:0 4px 4px #0000001a;overflow:hidden;width:100%}.pick-image[_ngcontent-%COMP%]:hover{opacity:.8}.pick-image[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{color:#7b7f82;margin:auto;align-items:center;font-size:15px}.pick-image[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{height:290px;width:90%;margin:auto;object-fit:scale-down}.btns[_ngcontent-%COMP%]{justify-self:center;margin-top:20px;margin-bottom:20px;display:flex;gap:20px}.btn[_ngcontent-%COMP%]{color:#fff;padding:8px 10px;border-radius:10px;font-size:15px;font-weight:500;box-shadow:0 4px 4px #0000001a;background-color:#3f484e;width:100px}.btn[_ngcontent-%COMP%]:nth-child(2){background-color:#676767}"]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.Bz.forChild(O),l.Bz]}),n})(),k=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[g.ez,o.u5,o.UX,y,f.Cq]}),n})()}}]);