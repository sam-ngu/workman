export const urlFactory = {
    make(url){
        return function (){
            this.pathname = url;
        }
    }
}