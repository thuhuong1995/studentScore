function getRandomMark(min = 6, max = 10) {
  return Math.floor(Math.random() * (max - min + 0.5)) + min;
}
numberRecordInput = 5;

let studentList = Array.from(Array(numberRecordInput), (item, index) => ({
  name: String.fromCharCode(65 + index),
  scores: {
    math: getRandomMark(),
    literature: getRandomMark(),
    physics: getRandomMark(),
    chemistry: getRandomMark(),
    biology: getRandomMark(),
  },
}));

studentList.forEach((value, index) => {
  studentList[index]["totalScore"] = averageScore(index);
});

studentList.forEach((value, index) => {
  studentList[index]["bonus"] = bonus(index);
});

window.addEventListener = ("load", renderList(studentList));

function renderList(listStudent) {
  let studentList = `
    <tr>
        <td>Tên</td>
        <td>Math Score</td>
        <td>Literature Score</td>
        <td>Physics Score</td>
        <td>Chemistry Score</td>
        <td>Byology Score</td>
        <td>Total Score</td>
        <td>Award</td>
    </tr>
    `;
  listStudent.forEach(
    (student, index) =>
      (studentList += `
      <tr>
          <td>${student.name}</td>
          <td> ${student.scores.math}</td>
          <td> ${student.scores.literature}</td>
          <td> ${student.scores.physics}</td>
          <td> ${student.scores.chemistry}</td>
          <td> ${student.scores.biology}</td>
          <td><p>${student.totalScore}</p></td>
          <td><p>${student.bonus}</p></td>
      </tr>
      `)
  );
  document.getElementById("list-student").innerHTML = studentList;
}

function averageScore(index) {
  const currentStudent = studentList[index];
  let countCorse = studentList.length;

  if (currentStudent) {
    const currentStudentScore = currentStudent.scores;
    let averageScores = 0;

    Object.keys(currentStudentScore).forEach(
      (key) => (averageScores += currentStudentScore[key])
    );
    averageScores =
      (averageScores +
        currentStudentScore.math +
        currentStudentScore.literature) /
      (countCorse + 2);
    return averageScores.toFixed(2);
  }
}
//
sortByCondition.addEventListener("change", filterByCondition);

function filterByCondition() {
  const sortByCondition = document.getElementById("sortByCondition").value;

  switch (sortByCondition) {
    case "searchGreatStudent":
      let searchGreatStudent = studentList.filter(
        (item) => item.totalScore >= 8
      );
      renderList(searchGreatStudent);
      break;
    case "selectBestStudent":
      let selectBestStudent = studentList.sort((item1, item2) => {
        if (item1.totalScore > item2.totalScore) {
          return -1;
        }
      });
      const bestStudent = selectBestStudent[0];
      renderList([bestStudent]);
      break;
    case "selectMinLiterature":
      let selectMinLiterature = studentList.sort((item1, item2) => {
        if (item1.scores.literature < item2.scores.literature) {
          return -1;
        }
      });
      const minScoreLiterature = selectMinLiterature[0];
      renderList([minScoreLiterature]);
      break;
    default:
      renderList(studentList);
      break;
  }
}
function bonus(index) {
  const currentStudent = studentList[index];
  if (currentStudent.totalScore === 10) {
    return "5000000";
  } else if (currentStudent.totalScore >= 9) {
    return "2000000";
  } else if (currentStudent.totalScore >= 8) {
    return "1000000";
  } else {
    return "0";
  }
}

const totalBonus = studentList.reduce(sumBonus, 0);
function sumBonus(bonusList, currentScore) {
  return bonusList + Number(currentScore.bonus);
}
document.getElementById("totalBonus").innerHTML = "Total bonus : " + totalBonus;
