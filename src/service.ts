

export async function getData(url:string){
  let token = "testtoken";
    let res = await fetch(url, {
     headers:{
        "Content-Type":"appliation/json",
        Accept:"application/json",
        Authorization:`Bearer ${token}`
     },
     method:'GET'
    });
    


}