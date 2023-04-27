let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('employeePayrollList') ? 
                        JSON.parse(localStorage.getItem('employeePayrollList')) : [];
}

const createInnerHtml = () => {
    if(empPayrollList.length==0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" + 
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";               
    let innerHtml = `${headerHtml}`;
    // let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {                    
    innerHtml = `${innerHtml}
     <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}  "> 
            </td> 
            <td>${empPayrollData._name}</td> 
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td> 
            <img id="${empPayrollData._id}" onclick="remove(this)" 
            alt="delete"src="assets/delete-black-18dp.svg">
            <img id="${empPayrollData._id}" onclick="update(this)"
            src="assets/create-black-18dp.svg" alt="edit">
          </td> 
        </tr> 
`;
    }
document.querySelector('#display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal =[
        {
            _name: 'prajwal gunjal',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary:'500000',
            _startDate: '29 Oct 2019',
            _note:'',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'arpit patil',
            _gender: 'Female',
            _department: [
                'Finance'
            ],
            _salary:'5000000',
            _startDate: '29 Sept 2020',
            _note:'',
            _id: new Date().getTime() +1,
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        }
    ];
    return empPayrollListLocal;
}


const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}


const remove = (node) => {
    let empPayrollData =empPayrollList.find(empData => empData._id == node._id);
    if(!empPayrollData) return;
    const index = empPayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}
