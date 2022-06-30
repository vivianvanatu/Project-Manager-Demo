
	function displayContent(type) {
		checkLogin();
		if (type === 'employees') {
			createEmployeesTable();
		} 
		if (type === 'projects') {
			createProjectsTable();
		}
		if (type === 'viewProject') {
			createProjectView();
		}
		if (type === 'viewEmployee') {
			createEmployeeView();
		}
		if (type === 'addemployee') {
			createAddEmployeeView();
		}
		if (type === 'addproject') {
			createAddProjectView();
		}
		
	}

	function checkLogin() {
		const userLoggedIn = sessionStorage.getItem('userLoggedIn');
		if (userLoggedIn !== 'logged') {
			window.location.replace('login.html');
		}
	}

	function doLogout() {
		const userLoggedIn = sessionStorage.getItem('userLoggedIn');
		if (userLoggedIn == 'logged') {
			sessionStorage.removeItem('userLoggedIn');
			window.location.replace('login.html');
		}
	}


	let employeesArr = [
		{
			name: 'Alex',
			age: 27,
			project: 1,
			birthdate: '1994-01-10',
			hired: '2020-10-05',
			phone: '0722112233',
			email: 'alex@leafltd.ro'
		},
		{
			name: 'Madalina',
			age: 25,
			project: 1,
			birthdate: '1997-09-15',
			hired: '2020-09-20',
			phone: '0722112234',
			email: 'mada@leafltd.ro'
		},
		{
			name: 'Cristina',
			age: 29,
			project: 2,
			birthdate: '1992-02-11',
			hired: '2021-01-17',
			phone: '0722112235',
			email: 'cristina@leafltd.ro'
		},
		{
			name: 'Mihai',
			age: 28,
			project: 3,
			birthdate: '1997-09-15',
			hired: '2020-09-20',
			phone: '0722112236',
			email: 'mihai@leafltd.ro'
		},
		{
			name: 'Razvan',
			age: 28,
			project: 3,
			birthdate: '1992-02-11',
			hired: '2021-01-17',
			phone: '0722112237',
			email: 'razvan@leafltd.ro'
		},
	];

	let projectsArr = [
		{
			id: 1,
			name: 'GreenYard',
			description: 'Lorem',
			startdate: '2020-10-01',
			duration: '24',
			requiredemployees: '10',
		},
		{
			id: 2,
			name: 'Back to school',
			description: 'Ipsum',
			startdate: '2021-04-01',
			duration: '36',
			requiredemployees: '10',
		},
		{
			id: 3,
			name: 'Magenta',
			description: 'Dolor',
			startdate: '2022-01-01',
			duration: '30',
			requiredemployees: '12',
		},
	];

	if (localStorage.getItem("employees") === null) {
    	localStorage.setItem('employees', JSON.stringify(employeesArr));
  	} else {
  		employeesArr = JSON.parse(localStorage.getItem("employees"));
  	}
  	if (localStorage.getItem("projects") === null) {
    	localStorage.setItem('projects', JSON.stringify(projectsArr));
  	} else {
  		projectsArr = JSON.parse(localStorage.getItem("projects"));
  	}

	function getProjectId() {
	    const searchArr = window.location.search.split('=');
	    let projectId = searchArr[1];

	    return projectId;
	}

	function createEmployeesTable() {
		const table = document.getElementById('employees_table');
		let tableStr = `<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Age</th>
							<th>Project</th>
							<th>Birthdate</th>
							<th>Hired at</th>
							<th>Phone</th>
							<th>Email</th>
						</tr>
						</thead>`;
		

		employeesArr.forEach((person, i) => {
			tableStr += createEmployeeRow(person, i);
		} );


		table.innerHTML = tableStr;
	}

	function createEmployeeView() {
		const employeename = getProjectId();

		let employeedata = employeesArr.find(function(employee, index) {
		      if(employee.name == employeename)
		        return true;
		    });

		const empview = document.getElementById('employee_container');
		let enddate = '';
		
		const currentemployees = employeesArr.filter((obj) => obj.name === employeedata.name).length;
		let viewOutput = `<h3>`	+ employeedata.name + `</h3>
						<p>Age: ` + employeedata.age + `</p>
						<p>Birthdate: ` + employeedata.birthdate + `</p>
						<p>Email: ` + employeedata.email + `</p>
						<p>Phone: ` + employeedata.phone + `</p>
						<p>Hired at: ` + employeedata.hired + `</p>
					`;
		
		projectsArr.forEach((project, i) => {
			
			 while (project.id == employeedata.project) {
			 	viewOutput += '<p>Project name: ' + project.name + '</p>';
			 	viewOutput += '<p>Description: ' + project.description + '</p>';
			 	viewOutput += '<p>Start date: ' + project.startdate + '</p>';
			 	viewOutput += '<p>End date: ' + enddate + '</p>';
			 	viewOutput += '<p>Duration: ' + project.duration + '</p>';
			 	viewOutput += '<p>Total employees: ' + project.requiredemployees + '</p>';
			 	break;
			}
		
		} );

		
		
		empview.innerHTML = viewOutput;
	}


	function createProjectView() {
		const projectid = getProjectId();

		let projectdata = projectsArr.find(function(project, index) {
		      if(project.id == projectid)
		        return true;
		    });

		const prjview = document.getElementById('project_container');
		let enddate = '';
		const currentemployees = employeesArr.filter((obj) => obj.project === projectdata.id).length;
		let viewOutput = `<div class="project_name"><h3>Project name: `	+ projectdata.name + `</h3></div>
						<div class="project_description">Description: ` + projectdata.description + `</div>
						<div class="project_description">ProjectId: ` + projectdata.id + `</div>
						<div class="project_date">Start date: ` + projectdata.startdate + `</div>
						<div class="project_date">End date: ` + enddate + `</div>
						<div class="project_date">Duration: ` + projectdata.duration + `</div>
						<div class="project_date">Required employees: ` + projectdata.requiredemployees + `</div>
						<div class="project_date">Current employees: ` + currentemployees + `</div>
					`;
		viewOutput += `<table id="employees_table" class="count" cellspacing="0" cellpadding="6">
						<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Age</th>							
							<th>Birthdate</th>
							<th>Hired at</th>
							<th>Phone</th>
							<th>Email</th>
						</tr>
						</thead>`;
		viewOutput += '<tbody>';	
		employeesArr.forEach((employee, i) => {
			
			while (employee.project == projectdata.id) {
				viewOutput += '<tr>';
				viewOutput += '<td></td>';
				viewOutput += '<td><a href="employee.html?employee=' + employee.name + '">' + employee.name + '</a></td>';
				viewOutput += '<td>' + employee.age + '</td>';
				viewOutput += '<td>' + employee.birthdate + '</td>';
				viewOutput += '<td>' + employee.hired + '</td>';
				viewOutput += '<td><a href="tel:' + employee.phone + '">' + employee.phone + '</a></td>';
				viewOutput += '<td><a href="mailto:' + employee.email + '">' + employee.email + '</a></td>';
				viewOutput += '</tr>';
				break;
			}
		
		} );

		viewOutput += '</tbody>';
		viewOutput += `</table>`;
		
		prjview.innerHTML = viewOutput;
	}

	function createProjectsTable() {
		const table = document.getElementById('projects_table');
		let tableStr = `<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Duration</th>
							<th>Employees (Current/Required)</th>
						</tr>
						</thead>`;
		
		
		projectsArr.forEach((project, i) => {
			tableStr += createProjectRow(project, i);
			const count = employeesArr.filter((obj) => obj.project === project.id).length;
			
		} );

		table.innerHTML = tableStr;
	}

	function createEmployeeRow(person, i) {
		const rowIndex = i + 1;
		const projectId = person.project ? person.project : '-';

		let projectName = projectsArr.find(item => item.id == projectId);
		console.log('ProjId: ', projectName.name);
		let rowStr = '<tr>';
		rowStr += '<td>' + rowIndex + '</td>';
		rowStr += '<td><a href="employee.html?employee=' + person.name + '">' + person.name + '</a></td>';
		rowStr += '<td>' + person.age + '</td>';
		rowStr += '<td><a href="project.html?projectid=' + projectName.id + '">' + projectName.name + '</a></td>';
		rowStr += '<td>' + person.birthdate + '</td>';
		rowStr += '<td>' + person.hired + '</td>';
		rowStr += '<td><a href="tel:' + person.phone + '">' + person.phone + '</a></td>';
		rowStr += '<td><a href="mailto:' + person.email + '">' + person.email + '</a></td>';
		rowStr += '</tr>';

		return rowStr;
	}

	function createProjectRow(project, i) {
		const rowIndex = i + 1;
		const endDate = project.startdate;
		const currentemployees = employeesArr.filter((obj) => obj.project === project.id).length;
		let rowStr = '<tr>';
		rowStr += '<td>' + rowIndex + '</td>';
		rowStr += '<td><a href="project.html?projectid=' + project.id + '">' + project.name + '</a></td>';
		rowStr += '<td>' + project.startdate + '</td>';
		rowStr += '<td>' + endDate + '</td>';
		rowStr += '<td>' + project.duration + '</td>';
		rowStr += '<td>' + currentemployees + ' / ' + project.requiredemployees + '</td>';
		rowStr += '</tr>';

		return rowStr;
	}

	function currentDateTime(type) {
		var currentdate = new Date();
	    let date;
	    let hours;
	    let minutes;  

	    if (type == 1) {
	      date = currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getFullYear();
	      mindate =  currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + (currentdate.getFullYear()-18);
	      maxdate =  currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + (currentdate.getFullYear()-65);
	    return {
	    	'currentdate': date,
	    	'mindate': mindate,
	    	'maxdate': maxdate,
	    }
	    } 
	    if (type == 'year') {
	      year = currentdate.getFullYear();
	    return year;
	    	
	    }  
	}

	let initialValAddEmployee = {
		name: false,
		age: false,
		projectlist: false,
		birthdate: false,
		hireddate: false,
		phone: false,
		email: false,
	};

	let valAddEmployee = initialValAddEmployee;

	function calculateAge() {
		const birthdateel = document.getElementById('birthdate');
		const birthdate = birthdateel.value;
		const birthyear = birthdate.split('/')[2];
		const date = currentDateTime('year');
		const age = date-birthyear;
		
		return age;
	}

	function calculateEnd() {
		const startdateel = document.getElementById('startdate');
		const durationel = document.getElementById('duration');
		const duration = durationel.value;
		const startyear = startdate.split('/')[2];
		const durationyears = duration/12;
		const enddate = startdate+durationyears;
		
		return enddate;
	}

	let initialValAddProject = {
		name: false,
		description: false,
		startdate: false,
		duration: false,
		employees: false,
		assignedemployees: false,
	};

	let valAddProject = initialValAddProject;

	function createAddEmployeeView() {
		const addEmployeeView = document.getElementById('addemployee');
		const date = currentDateTime(1);

		output = `<h3>Add New Employee</h3>
				<div class="input_field">
					<span class="input_label">
						Name: 
					</span>
						<input type="text" name="name" id="name" onkeyup="checkInputEmp('name')" required>
						<div class="error-text" id="name_error" style="display:none;">3 to 24 characters allowed. Must contain only letters and spaces.</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Age: 
					</span>
						<input type="text" name="age" id="age" placeholder="Fill in the birthdate &#8595" onchange="checkInputEmp('age')" >
						<div class="error-text" id="age_error" style="display:none;">Must be between 18 and 65 years old</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Project: 
					</span>
						
						<select name="projectlist" id="projectlist" class="form-select" onchange="checkInputEmp('projectlist')">						  
						</select>
						<div class="error-text" id="projectlist_error" style="display:none;">You must select a project</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Birthdate: 
					</span>
						<input type="text" name="birthdate" type="date" placeholder="` + date.mindate + `" value="" min="` + date.mindate + `" max="` + date.maxdate + `" id="birthdate" onkeyup="checkInputEmp('birthdate')">
						<div class="error-text" id="birthdate_error" style="display:none;">Must be between 18 and 65 years old</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Hired at: 
					</span>
						<input type="text" name="hiredat" id="hireddate" placeholder="yyyy" onkeyup="checkInputEmp('hireddate')">
						<div class="error-text" id="hireddate_error" style="display:none;">Must be a full year.</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Phone: 
					</span>
						<input type="text" name="phone" id ="phone" placeholder="0700-000-000" onkeyup="checkInputEmp('phone')">
						<div class="error-text" id="phone_error" style="display:none;">Must be at least 10 digits in 0700-000-000 format.</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Email: 
					</span>
						<input type="text" name="email" id ="email" onkeyup="checkInputEmp('email')">
						<div class="error-text" id="email_error" style="display:none;">Incorect email format</div>
				</div>
				<div class="success_message msg_text" id="form_success" >
					Employee added successful ... redirecting
				</div>
				<div class="error_message msg_text" id="form_error">
					Something is wrong ... please try again
				</div>
				<div class="button_container">
					<button class="addEmployeeBtn" id="addEmployeeBtn" onclick="addEmployee()" disabled>Add Employee</button>
				</div>`;

			addEmployeeView.innerHTML = output;

			const projectlist = document.getElementById('projectlist');
			
			let selectoutput = '<option value="0">Select project...</option>';
			projectsArr.forEach((project, i) => {
				selectoutput += '<option value="' + project.id+ '">' + project.name + '</option>';
			});
			 
			projectlist.innerHTML = selectoutput;
	}

	function createAddProjectView() {
		const addProjectView = document.getElementById('addproject');
		output = `<h3>Add New Project</h3>
				<div class="input_field">
					<span class="input_label">
						Name: 
					</span>
						<input type="text" name="name" id="name" placeholder="Project name..." onkeyup="checkInputPrj('name')">
						<div class="error-text" id="name_error" style="display:none;">3 to 24 characters allowed. Must contain only letters and spaces.</div>
				</div>
				<div class="input_field">
					<span class="input_label" style="width: 150px;">
						Description: 
					</span>
						<textarea name="description" id="description" rows="4" cols="48" class="form-textarea" onkeyup="checkInputPrj('description')"></textarea>
						<div class="error-text" id="description_error" style="display:none;">10-300 characters, no punctuation or symbols allowed.</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Start Date: 
					</span>
						<input type="text" name="startdate" id="startdate" placeholder="Project start date..." onkeyup="checkInputPrj('startdate')">
						<div class="error-text" id="startdate_error" style="display:none;">Must be a date with the following format: DD-MM-YYYY</div>
				</div>
				<div class="input_field">
					<span class="input_label">
						Duration: 
					</span>
						<input type="number" name="duration" id="duration" min="6" max="120" placeholder="Between 6 and 120 months" style="width: 60%;" onkeyup="checkInputPrj('duration')">
						<div class="error-text" id="duration_error" style="display:none;">Please select a number between 6 and 120 months</div>

				</div>
				<div class="input_field">
					<span class="input_label">
						Employees: 
					</span>
						<input type="number" name="requiredemployees" id="requiredemployees" min="1" max="20" placeholder="No of max employees" style="width: 60%;" onchange="checkInputPrj('requiredemployees')">
						<div class="error-text" id="requiredemployees_error" style="display:none;">Please insert the maximum number of employees</div>
				</div>
				<div class="input_field">
					<span class="input_label" style="width: 150px;">
						Assign employees: 
					</span>
						<select name="assignedemployees" id="assignedemployees" class="form-multi-select" multiple="multiple" size="5" onchange="checkInputPrj('assignedemployees')"></select>
						<div class="error-text" id="assignedemployees_error" style="display:none;">Please select employees for this project.</div>
						
				</div>
				<div class="success_message msg_text" id="form_success">
					Employee added successful ... redirecting
				</div>
				<div class="error_message msg_text" id="form_error">
					Something is wrong ... please try again
				</div>
				<div class="button_container">
					<button class="addProjectBtn" id="addProjectBtn" onclick="addProject()" disabled>Add Project</button>
				</div>`;

			addProjectView.innerHTML = output;
			
			const assignedemployees = document.getElementById('assignedemployees');
			
			let selectoutput = '';
			employeesArr.forEach((employee, i) => {
			 	selectoutput += '<option value="' + employee.name+ '">' + employee.name + '</option>';
			});
	
			assignedemployees.innerHTML = selectoutput;
	}

	function addNewEmployee() {
		window.location.replace('addemployee.html');
	}
	function addNewProject() {
		window.location.replace('addproject.html');
	}
	function addEmployee() {
		const Name = document.getElementById('name').value;
		const Age = parseInt(document.getElementById('age').value);
		const Project = parseInt(document.getElementById('projectlist').value);
		const Birthdate = document.getElementById('birthdate').value;
		const HiredDate = document.getElementById('hireddate').value;
		const Phone = document.getElementById('phone').value;
		const Email = document.getElementById('email').value;

		let empData = {
			name: Name,
			age: Age,
			project: Project,
			birthdate: Birthdate,
			hired: HiredDate,
			phone: Phone,
			email: Email
		};
		
		employeesArr.push(empData);
		
		localStorage.setItem('employees', JSON.stringify(employeesArr));

		formsuccess = document.getElementById('form_success');
		formerror = document.getElementById('form_error');

		formsuccess.style.display = "block";
		formerror.style.display = "none";

		setTimeout(function(){
			window.location.replace('index.html');
		}, 3000);
		
	}

	function addProject() {
		// get the last id and assign the next id = lastid +1
		

		// create form validation 


		let lastproject = projectsArr.slice(-1);
		const newprojectid = parseFloat(lastproject[0].id) + parseFloat(1);
		const Name = document.getElementById('name').value;
		const Description = document.getElementById('description').value;
		const StartDate = document.getElementById('startdate').value;
		const Duration = document.getElementById('duration').value;
		const SelRequiredEmployees = document.getElementById('requiredemployees').value;
		const SelAssignEmployees = document.getElementById('assignedemployees');
		let selectedEmployees = [...SelAssignEmployees.selectedOptions]
                    			.map(option => option.value);
    	
    	selectedEmployees.forEach((empforproject, i) => {
    			
    			let employeedata = employeesArr.find(function(employee, index) {
		      	
		      	
		      	if(employee.name == empforproject) {
		        	employee.project = newprojectid;
		        
		    	return true;
		      	}
		    });
    		// console.log(employeedata);
			localStorage.setItem('employees', JSON.stringify(employeesArr));
    	});  	
    	

		//check if the assgnemployees count exceeds the max no of employees;

		let prjData = {
			id: newprojectid,
			name: Name,
			description: Description,
			startdate: StartDate,
			duration: Duration,
			requiredemployees: SelRequiredEmployees,
		};
		
		projectsArr.push(prjData);
		
		localStorage.setItem('projects', JSON.stringify(projectsArr));
		console.log(newprojectid); 
		
		formsuccess = document.getElementById('form_success');
		formerror = document.getElementById('form_error');

		formsuccess.style.display = "block";
		formerror.style.display = "none";

		setTimeout(function(){
			window.location.replace('projects.html');
		}, 3000);

				
	}

	function checkValAddEmployee() {
		const valKeys = Object.keys(valAddEmployee);
		let flag = true;
		valKeys.forEach(key => {
			if(!valAddEmployee[key]) {
				flag = false;
			}
		});

		if(flag === false) {
			document.getElementById('addEmployeeBtn').disabled = true;
		} else {
			document.getElementById('addEmployeeBtn').disabled = false;
		}

	} 

	function checkInputEmp(elementid) {
		const input_element = document.getElementById(elementid);
		const err_element = document.getElementById(elementid + 'error');
		const input_value = input_element.value;
		
		let pattern;

		if (elementid === 'name') {
	      pattern = /(?!.*[\.\-\_\ ]{2,})^[a-zA-Z0-9\.\-\_\ ]{3,24}$/gm;

	    }

	    if (elementid == 'age') {
	      pattern = "";

	    }
	    
	    if (elementid === 'projectlist') {
	       pattern = /^[1-9]$/gm;
	       let projectvalue = document.getElementById('projectlist').value;
	       if(projectvalue !== 0) {
	       		
	       		valAddEmployee[elementid] = true;
	   	   }
	    }
	    if (elementid === 'birthdate') {
	      pattern = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/g;
	      let calculateage = calculateAge();
	      if (calculateage >= 18 && calculateage < 65){
	      	document.getElementById('age').value = calculateage;
	      	document.getElementById('age_error').style.display = 'none';
	      	let agevalue = document.getElementById('age');
	      	valAddEmployee.age = true;
	      } else {
	      	document.getElementById('age_error').style.display = 'inline-block';
	      }
	    }
	    if (elementid === 'hireddate') {
	      pattern = /^([1-9][0-9][0-9][0-9])$/gm;
	      
	    }
	    if (elementid === 'phone') {
	      pattern = /^([0-9]{4}[0-9]{3}[0-9]{3})$/gm;
	      
	    }
	    if (elementid === 'email') {
	      pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	      
	    }	    
	    
	    if (pattern.test(input_value) === true) {
	      document.getElementById(elementid + '_error').style.display = 'none';
	      valAddEmployee[elementid] = true;
    
	    } else if (pattern.test(input_value) === false) {
	        document.getElementById(elementid + '_error').style.display = 'inline-block';
	        valAddEmployee[elementid] = false;
	    } else {
	    	document.getElementById(elementid + '_error').style.display = 'inline-block';
	    	valAddEmployee[elementid] = false;
	    }
	    
	    checkValAddEmployee();
 	}

	function checkValAddProject() {
		const valKeys = Object.keys(valAddProject);
		let flag = true;
		valKeys.forEach(key => {
			if(!valAddProject[key]) {
				flag = false;
			}
		});

		if(flag === false) {
			document.getElementById('addProjectBtn').disabled = true;
		} else {
			document.getElementById('addProjectBtn').disabled = false;
		}

	} 

	function checkInputPrj(elementid) {
		const input_element = document.getElementById(elementid);
		const err_element = document.getElementById(elementid + 'error');
		const input_value = input_element.value;
		
		let pattern;

		if (elementid === 'name') {
	      pattern = /(?!.*[\.\-\_\ ]{2,})^[a-zA-Z0-9\.\-\_\ ]{3,24}$/gm;

	    }

	    if (elementid == 'description') {
	      pattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]{10,500}$/ig;
	      

	    }
	    
	    if (elementid === 'startdate') {
	      pattern = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/g;
	    }
	    if (elementid === 'duration') {
	      pattern = /^[6-9]|[1-9][0-9]|1[0-1][0-9]|1[2][0]/gm;
	      
	    }
	    if (elementid === 'requiredemployees') {
	      pattern = /\b([1-9]|[1-9][0-9]|1[01][0-9]|12[0-7])\b/gm;
	      
	    }
	    if (elementid === 'assignedemployees') {
	      pattern = "";
	      
	    }	    
	    
	    if (pattern.test(input_value) === true) {
	      document.getElementById(elementid + '_error').style.display = 'none';
	      valAddProject[elementid] = true;
	      console.log('Desc');
    
	    } else if (pattern.test(input_value) === false) {
	        document.getElementById(elementid + '_error').style.display = 'inline-block';
	        valAddProject[elementid] = false;
	    } else {
	    	document.getElementById(elementid + '_error').style.display = 'inline-block';
	    	valAddProject[elementid] = false;
	    }
	    console.log(valAddProject[elementid]);
	    
	    checkValAddProject();
 	}

	