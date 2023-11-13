var tbody = document.getElementById('tbody');
var addBtn = document.getElementById('add');
var resetBtn = document.getElementById('reset');
var totalGPA = document.querySelector('.gpa .total');

var examples = `
<tr>
    <td>Example 1</td>
    <td>80</td>
    <td class="sub-hours">2</td>
    <td>B+</td>
    <td class="sub-points">3.3</td>
</tr>
<tr>
    <td>Example 2</td>
    <td>75</td>
    <td class="sub-hours">3</td>
    <td>B</td>
    <td class="sub-points">3</td>
</tr>
<tr>
    <td>Example 3</td>
    <td>93</td>
    <td class="sub-hours">3</td>
    <td>A+</td>
    <td class="sub-points">4</td>
</tr>
<tr>
    <td>Example 4</td>
    <td>85</td>
    <td class="sub-hours">3</td>
    <td>A</td>
    <td class="sub-points">3.7</td>
</tr>`

var inputs = `
<tr>
    <td>
        <input type="text" placeholder="Subject Name" name="subject" id="subject">
    </td>
    <td title="Total Mark Out Of 100">
        <input type="number" max="100" min="0" placeholder="Out Of 100" name="mark" id="mark">
    </td>
    <td>
        <input type="number" max="6" min="2" placeholder="Hours" name="hours" id="hours">
    </td>
    <td title="the grade will be assigned after add the course">
        <input type="text"  placeholder="will be assigned" class="readonly-input" readonly name="grade" id="grade">
    </td>
    <td title="the points will be calculated after add the course">
        <input class="readonly-input" placeholder="will be calculated" name="points" readonly id="points">
    </td>
</tr>`;

tbody.innerHTML = examples + inputs;
CalculateTotalGPA();

addBtn.addEventListener('click', function () {
    addSubject();
});

tbody.addEventListener('keyup', function (e) {
    if (e.target.id == 'mark') {
        var gradeInput = document.getElementById('grade');
        var pointInput = document.getElementById('points');
        var mark = e.target.value;
        var grade = calculateGrade(mark);
        if(grade == 'F' || grade == 'Invalid Mark')
        {
            gradeInput.value = grade;
            gradeInput.style.color = 'red';

            pointInput.value = calculatePoint(mark);
            pointInput.style.color = 'red';
        }
        else
        {
            gradeInput.value = grade;
            gradeInput.style.color = 'black';

            pointInput.value = calculatePoint(mark);
            pointInput.style.color = 'black';
        }
        
        if(mark == '')
        {
            gradeInput.value = '';
            pointInput.value = '';
        }
    }
});

resetBtn.addEventListener('click', function () {
    tbody.innerHTML = inputs;
    totalGPA.innerHTML = '0.00';
});

function addSubject(){
    var subject = document.getElementById('subject').value;
    var mark = document.getElementById('mark').value;
    var hours = document.getElementById('hours').value;

    if (subject == '' || mark == '') {
        alert('Please fill up all the fields');
    } else if (mark > 100 || mark < 0) {
        alert('Invalid Mark');
    }
    else if (hours > 6 || hours < 2) {
        alert('Invalid Hours');
    } else {
        var current = tbody.innerHTML;
        var added = `
        <tr>
            <td>${subject}</td>
            <td>${mark}</td>
            <td class="sub-hours">${hours}</td>
            <td>${calculateGrade(mark)}</td>
            <td class="sub-points">${calculatePoint(mark)}</td>
        </tr>`;
        tbody.innerHTML = added + current;
        subject.value = '';
        mark.value = '';
        hours.value = '';
        
        CalculateTotalGPA();
    }
}

function calculateGrade(mark) {
    if (mark >= 90 && mark <= 100) {
        return 'A+';
    } else if (mark >= 85 && mark < 90) {
        return 'A';
    } else if (mark >= 80 && mark < 85) {
        return 'B+';
    } else if (mark >= 75 && mark < 80) {
        return 'B';
    } else if (mark >= 70 && mark < 75) {
        return 'C+';
    } else if (mark >= 65 && mark < 70) {
        return 'C';
    } else if (mark >= 60 && mark < 65) {
        return 'D+';
    } else if (mark >= 50 && mark < 60) {
        return 'D';
    } else if(mark >= 0 && mark < 50) {
        return 'F';
    }else{
        return 'Invalid Mark';
    }
}

function calculatePoint(mark) 
{
    if (mark >= 90 && mark <= 100) {
        return 4.0;
    } else if (mark >= 85 && mark < 90) {
        return 3.7;
    } else if (mark >= 80 && mark < 85) {
        return 3.3;
    } else if (mark >= 75 && mark < 80) {
        return 3.0;
    } else if (mark >= 70 && mark < 75) {
        return 2.7;
    } else if (mark >= 65 && mark < 70) {
        return 2.4;
    } else if (mark >= 60 && mark < 65) {
        return 2.2;
    } else if (mark >= 50 && mark < 60) {
        return 2.0;
    } else if(mark >= 0 && mark < 50) {
        return 0.0;
    }else{
        return 'Invalid Mark';
    }
}

function CalculateTotalGPA(){
    var total = 0;
    var count = 0;
    var grade = document.querySelectorAll('.sub-points');
    var hours = document.querySelectorAll('.sub-hours');
    for (let i = 0; i < grade.length; i++) {
            total += parseFloat(grade[i].innerHTML) * parseFloat(hours[i].innerHTML);
            count += parseFloat(hours[i].innerHTML);
    }
    totalGPA.innerHTML = (total / count).toFixed(2);
}