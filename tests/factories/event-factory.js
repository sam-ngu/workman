
export const eventFactory ={

    make(url, method='get'){
       return {
           request: {
               clone: function () {
                   return {...this};
               },
               url,
               method,
           },
           respondWith(response) {

           },

       };
    }
}