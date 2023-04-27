window.addEventListener('DOMContentLoaded' , (event) => {
   const name = document.querySelector('#name');
   const textError = document.querySelector('.text-error');
   name.addEventListener('input' , function() {
       if(name.value.length == 0){
           textError.textContent = "";
           return;
       }

       try {
           (new EmployeePayrollData()).name = name.value;
           textError.textContent ="";
       } catch (e) {
           textError.textContent = e;
       }
   })
   const salary = document.querySelector('#salary');
   const output = document.querySelector('.salary-output');
   output.textContent =salary.value;
   salary.addEventListener('input',function(){
       output.textContent = salary.value;
   });
   
});

const save = () => {
   try{
       employeePayrollData = createEmployeePayroll();
       createAndUpdateStorage(employeePayrollData); 
       alert("added " );
   }catch(e){
      alert(e);
       return;
   }
}

function createAndUpdateStorage(employeePayrollData){

   let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));

   if(employeePayrollList != undefined){
       employeePayrollList.push(employeePayrollData);
   }
   else{
       employeePayrollList = [employeePayrollData];
   }
   alert(employeePayrollList.toString());
   localStorage.setItem("employeePayrollList",JSON.stringify(employeePayrollList))
}


const createEmployeePayroll = () => {
   let employeePayrollData = new EmployeePayrollData();
   try {
       employeePayrollData.name = getInputValueById('#name');
   } catch (e) {
       setTextValue('.text-error',e);
   }
   employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
   employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
   employeePayrollData.department = getSelectedValues('[name=department]');
   employeePayrollData.salary = getInputValueById('#salary');
   employeePayrollData.note = getInputValueById('#notes');
   let day = getInputValueById('#day');
   let month = getInputValueById('#month');
   let year = getInputValueById('#year');
   let isoDate = `${year}-${month}-${day}`;
 //.startDate = new Date(isoDate);
 employeePayrollData.startDate = new Date(isoDate);

   alert(employeePayrollData.toString());
   return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
   let allItems = document.querySelectorAll(propertyValue);
   let selItems = [];
   allItems.forEach(item => { if(item.checked) {selItems.push(item.value);} })
   return selItems;
}
const getInputValueById = (id) => {
   let value = document.querySelector(id).value;
   return value;
}
const getInputElementValue = (id) => {
   let value = document.getElementById(id).value;
   return value;
}


const resetForm = () => {
   setValue('#name',''); 
   unsetSelectedValues('[name=profile]'); 
   unsetSelectedValues('[name=gender]'); 
   unsetSelectedValues('[name=department]'); 
   setValue('#salary',''); 
   setValue('#notes',''); 
   setValue('#day','1'); 
   setValue( '#month', 'January'); 
   setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
   let allItems = document.querySelectorall(propertyValue); 
   allItems.forEach(item => {
   item. checked = false; 
   });
}
const setTextValue = (id, value) => {
   const element = document.querySelector(id); 
   element. textContent = value;
}
const setValue = (id, value) => {
   const element = document.querySelector(id);
   element.value = value;
}