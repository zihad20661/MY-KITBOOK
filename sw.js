self.addEventListener("push",event=>{
  let data={title:"MY-KITBOOK — Due Reminder",body:"তোমার কিটের Due হয়েছে",url:"https://zihad20661.github.io/MY-KITBOOK/"};
  try{if(event.data)data={...data,...event.data.json()}}catch(e){}
  event.waitUntil(self.registration.showNotification(data.title,{body:data.body,tag:"my-kitbook-due",data:{url:data.url},renotify:false}));
});
self.addEventListener("notificationclick",event=>{
  event.notification.close();
  const target=event.notification.data?.url||"https://zihad20661.github.io/MY-KITBOOK/";
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const client of list){if("focus"in client)return client.focus().then(()=>client.navigate(target));}
    return clients.openWindow(target);
  }));
});