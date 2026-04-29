//load all issues
const loadallissues=()=>{
    // console.log('hello');
    const url='https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url).then(res=>res.json()).then(json=>{
        displayallissues(json.data);
    })
}
loadallissues();

//priority color
const prioritycolor=(priority)=>{
    if(priority==='high')
        return 'btn-secondary';
    if(priority==='medium')
        return 'btn-warning';
    if(priority==='low')
        return;
}

//get status
const getstatusborder=(status)=>{
    // console.log(status);
    if(status==='open'){
        return 'border-top-green';
    }
    if(status==='closed'){
        return 'border-top-violet';
    }
        
}

//load colors for labels
const loadcolors=(element)=>{
    const ele=element.toLowerCase();
    if(ele==='bug')
        return 'btn-soft btn-secondary';
    if(ele==='help wanted')
        return 'btn-soft btn-warning';
    if(ele==='enhancement')
        return 'btn-soft btn-success';
    if(ele==='documentation')
        return 'btn-soft btn-primary';
    if(ele==='good first issue')
        return 'btn-soft btn-info';
}

//load the associated lavels
const loadlavels=(array)=>{
  const elements=array.map(element=>
    `<span class="btn  rounded-full px-6 max-h-[24px] ${loadcolors(element)}">${element}</span>`
  );
  return elements.join(' ');
}

//display all issues on the dashboard
const displayallissues=(issues)=>{
    const issuecontainer=document.getElementById('issue-container');
    issuecontainer.innerHTML='';
    // console.log(issues);
    issues.forEach(issue=>{
        // console.log(issue.id);
        const card=document.createElement('div');
        card.innerHTML=`
        <div class="card min-h-full shadow-lg bg-white p-5 rounded-md space-y-3 ${getstatusborder(issue.status)}">
          <div class="flex items-center justify-between">
            <img src="./assets/${issue.status==='open'?'Open-status.png':'Closed- Status .png'}" alt="" />
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
          <p class="text-neutral/50">#1 by john_doe</p>
          <p class="text-neutral/50">1/15/2024</p>
        </div>
        `;
        issuecontainer.appendChild(card);
    })

}