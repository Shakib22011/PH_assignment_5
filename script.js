//active function
const removeactive = () => {
  const lessonbuttons = document.querySelectorAll(".tab-button");
  // console.log(lessonbuttons);
  lessonbuttons.forEach((each) => {
    each.classList.remove("btn-primary");
  });
};

//load all issues
const loadallissues = () => {
  // console.log('hello');
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayallissues(json.data);
      document.getElementById("allbutton").classList.add("btn-primary");

      document.getElementById("allbutton").addEventListener("click", () => {
        displayallissues(json.data);
        document.getElementById("count").innerHTML = "50";
        removeactive();
        document.getElementById("allbutton").classList.add("btn-primary");
      });
      document.getElementById("openbutton").addEventListener("click", () => {
        displayopenissues(json.data);
        // document.getElementById('count').innerHTML='44';
        removeactive();
        document.getElementById("openbutton").classList.add("btn-primary");
      });
      document.getElementById("closebutton").addEventListener("click", () => {
        displayclosedissues(json.data);
        // document.getElementById('count').innerHTML='6';
        removeactive();
        document.getElementById("closebutton").classList.add("btn-primary");
      });
    });
};
loadallissues();

//priority color
const prioritycolor = (priority) => {
  if (priority === "high") return "btn-secondary";
  if (priority === "medium") return "btn-warning";
  if (priority === "low") return;
};

//get status
const getstatusborder = (status) => {
  // console.log(status);
  if (status === "open") {
    return "border-top-green";
  }
  if (status === "closed") {
    return "border-top-violet";
  }
};

//load colors for labels
const loadcolors = (element) => {
  const ele = element.toLowerCase();
  if (ele === "bug") return "btn-soft btn-secondary";
  if (ele === "help wanted") return "btn-soft btn-warning";
  if (ele === "enhancement") return "btn-soft btn-success";
  if (ele === "documentation") return "btn-soft btn-primary";
  if (ele === "good first issue") return "btn-soft btn-info";
};

//load the associated lavels
const loadlavels = (array) => {
  const elements = array.map(
    (element) =>
      `<span class="btn  rounded-full px-6 max-h-[24px] ${loadcolors(element)}">${element.toUpperCase()}</span>`,
  );
  return elements.join(" ");
};

//load modal details
const loadmodal=(id)=>{
    // console.log(id);
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url).then(res=>res.json()).then(json=>{
        displaymodal(json.data);
    })
}

//modal data display
const displaymodal=(data)=>{
    const modalcontainer=document.getElementById('modal_container');
    modalcontainer.innerHTML=`
    <h2 class="text-2xl font-bold">${data.title}</h2>
      <div class="flex gap-3">
        <button class="btn btn-soft btn-success rounded-full px-6 max-h-[24px]">${data.status==='open'?'Opened':'Closed'}</button>
        <p class="flex items-center gap-3 text-neutral/60"><img src="./assets/Ellipse 5.png" alt=""> Opened by ${data.author}  <img src="./assets/Ellipse 5.png" alt="">  ${data.createdAt.split('T')[0]}</p>
      </div>
    <div class="flex gap-2 items-center flex-wrap">
              ${loadlavels(data.labels)}
            </div>
      <p class="text-neutral/50">${data.description}</p>
    <div class="bg-gray-200 rounded-lg grid grid-cols-3 p-3">
      <div>
        <p>Assignee:</p>
        <h2 class="font-semibold">${data.author}</h2>
      </div>
      <div>
        <p>Priority</p>
        <button class="btn  rounded-full px-6 max-h-[24px] ${prioritycolor(data.priority)}">${data.priority}</button>
      </div>
      <div>

      </div>
    </div>
    `;
    document.getElementById('my_modal_5').showModal();
}

//display all issues on the dashboard
const displayallissues = (issues) => {
  const issuecontainer = document.getElementById("issue-container");
  issuecontainer.innerHTML = "";
//   console.log(issues);
  issues.forEach((issue) => {
    // console.log(issue.id);
    const card = document.createElement("div");
    card.innerHTML = `
        <div onclick="loadmodal(${issue.id})" class="card min-h-full shadow-lg bg-white p-5 rounded-md space-y-3 ${getstatusborder(issue.status)}">
          <div class="flex items-center justify-between">
            <img src="./assets/${issue.status === "open" ? "Open-status.png" : "Closed- Status .png"}" alt="" />
            <button class="btn btn-soft ${prioritycolor(issue.priority)} rounded-full px-6 max-h-[24px]">${issue.priority}</button>
          </div>
          <div class="space-y-4">
            <h2 class="text-lg font-semibold">${issue.title}</h2>
            <p class="text-neutral/70">
              ${issue.description}
            </p>
            <div class="flex gap-2 items-center flex-wrap">
              ${loadlavels(issue.labels)}
            </div>
          </div>
          <div class="divider text-neutral/50"></div>
          <p class="text-neutral/50">#${issue.id} by ${issue.author} </p>
          <p class="text-neutral/50">${issue.createdAt.split('T')[0]}</p>
        </div>
        `;
    issuecontainer.appendChild(card);
  });
};



//display open issues
const displayopenissues = (issues) => {
  const issuecontainer = document.getElementById("issue-container");
  issuecontainer.innerHTML = "";
  let count = 0;
  // console.log(issues);
  issues.forEach((issue) => {
    if (issue.status === "open") {
      count++;
      // console.log(issue.id);
      const card = document.createElement("div");
      card.innerHTML = `
        <div onclick="loadmodal(${issue.id})" class="card min-h-full shadow-lg bg-white p-5 rounded-md space-y-3 ${getstatusborder(issue.status)}">
          <div class="flex items-center justify-between">
            <img src="./assets/${issue.status === "open" ? "Open-status.png" : "Closed- Status .png"}" alt="" />
            <button class="btn btn-soft ${prioritycolor(issue.priority)} rounded-full px-6 max-h-[24px]">${issue.priority}</button>
          </div>
          <div class="space-y-4">
            <h2 class="text-lg font-semibold">${issue.title}</h2>
            <p class="text-neutral/70">
              ${issue.description}
            </p>
            <div class="flex gap-2 items-center flex-wrap">
              ${loadlavels(issue.labels)}
            </div>
          </div>
          <div class="divider text-neutral/50"></div>
          <p class="text-neutral/50">#${issue.id} by ${issue.author} </p>
          <p class="text-neutral/50">${issue.createdAt.split('T')[0]}</p>
        </div>
        `;
      issuecontainer.appendChild(card);
    } else return;
  });
  document.getElementById("count").innerHTML = count;
};

//display closed issues
const displayclosedissues = (issues) => {
  const issuecontainer = document.getElementById("issue-container");
  issuecontainer.innerHTML = "";
  let count = 0;
  // console.log(issues);
  issues.forEach((issue) => {
    if (issue.status === "closed") {
      count++;
      // console.log(issue.id);
      const card = document.createElement("div");
      card.innerHTML = `
        <div onclick="loadmodal(${issue.id})" class="card min-h-full shadow-lg bg-white p-5 rounded-md space-y-3 ${getstatusborder(issue.status)}">
          <div class="flex items-center justify-between">
            <img src="./assets/${issue.status === "open" ? "Open-status.png" : "Closed- Status .png"}" alt="" />
            <button class="btn btn-soft ${prioritycolor(issue.priority)} rounded-full px-6 max-h-[24px]">${issue.priority}</button>
          </div>
          <div class="space-y-4">
            <h2 class="text-lg font-semibold">${issue.title}</h2>
            <p class="text-neutral/70">
              ${issue.description}
            </p>
            <div class="flex gap-2 items-center flex-wrap">
              ${loadlavels(issue.labels)}
            </div>
          </div>
          <div class="divider text-neutral/50"></div>
        <p class="text-neutral/50">#${issue.id} by ${issue.author} </p>
          <p class="text-neutral/50">${issue.createdAt.split('T')[0]}</p>
        </div>
        `;
      issuecontainer.appendChild(card);
    } else return;
  });
  document.getElementById("count").innerHTML = count;
};
