const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) { //4
  localStorage.setItem(USER_LS, text); // 로컬스토리지에 입력값을 세팅저장
}

function handleSubmit(event) { //3
  event.preventDefault(); // javascript:void(0)랑 같은 효과
  const currentValue = input.value;
  paintGreeting(currentValue); //인풋 입력값 전달
  saveName(currentValue); //인풋 입력값 전달
}

function askForName() { //2
  form.classList.add(SHOWING_CN); //품이 뜬다
  form.addEventListener("submit", handleSubmit); //이름을 저장할수있는 섭밋이벤트를 추가
} 

function paintGreeting(text) { //1 TOOL
  form.classList.remove(SHOWING_CN); //처음에 폼 삭제
  greeting.classList.add(SHOWING_CN); //헬로 서영규 들어갈 노드 생성
  greeting.innerText = `Hello ${text}!`; // 헬로 서영규 입력
}

function loadName() { //0
  const currentUser = localStorage.getItem(USER_LS); //currentUser를 키로 입력
  if (currentUser === null) {
    askForName(); //처음에 이름 물을때
  } else {
    paintGreeting(currentUser); //이름 저장되어 있을떄
  }
}

function init() {
  loadName();
}

init();


