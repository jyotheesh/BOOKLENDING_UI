import { FormGroup } from "@angular/forms";

export let confirmPassValid=(group:FormGroup)=>{
let password=group.value.pword;
let cpassword=group.value.cpword;
console.log(password,cpassword)
return password===cpassword?null:{'custom':true}

}