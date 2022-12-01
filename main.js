 //http://www.omdbapi.com/apikey.aspx?VERIFYKEY=5cd376c1-fb9f-46bf-8fef-a3d8e1ea14cc

 //http://www.omdbapi.com/?i=tt3896198&apikey=16aaff8a



// changing value in searchengine

 $("select").on("change" , function(){
     $(".nameInput").attr("placeholder",`Enter ${this.value} Name`)
 })

 var currentPage = 1;
 var totalPages = 0;
 $(".searchButton").on("click",()=>getMovies(1));
 $(".nameInput").on("keyup", e=>{
    if (e.keyCode === 13){
        getMovies(1);
    }
 })

 function getMovies(page){
     console.log(page)
    let query = $(".nameInput").val()
    url = `http://www.omdbapi.com/?s=${query}&page=${page}&type=${$("#searchType").val()}&apikey=16aaff8a`
    fetch(url).then(Response=>{
        return  Response.json();
    }).then(data=>{
        console.log(data);
        $(".list").empty()
        // $(".discription").empty()
         $(".noResult").css("display","none")
      
        if(data.Response=="True"){
           data.Search.forEach(e => {
            $('.list').append(`
              
            <div class="movieCard">
                <div  data-imdbid=${e.imdbID} class="card1">
                <img src="${e.Poster}">
                <p>${e.Title}</p>
                </div>
            </div>
            `)
           });

        //page no ++
        $('.currentPage').text(page)
        
        $(".pageNO").css("display","flex");

        $(".cardSection i").css("display","block")   
        $(".searchEngine").addClass("fakeSearchEngine").removeClass("searchEngine")

       if(page==1 && data.totalResults > 10){
        $(".prev,.next").show()
        totalPages = Math.ceil(data.totalResults/10)
        $('.totalPage').text(totalPages)
    }   
        }else{
            $(".prev,.next").hide()
            $(".noResult").css("display","flex")
            $(".searchEngine").addClass("fakeSearchEngine").removeClass("searchEngine")
        }
    })
 }
 //function end

 $(".next").on("click",function(){
    if(currentPage < totalPages){
        currentPage++;
        getMovies(currentPage);
    }
    if(currentPage === totalPages-1) $(".next").hide()

})

$(".prev").on("click",function(){
    if(currentPage >= 2){
        currentPage--;
        getMovies(currentPage);
    }
})



$(document).on("click",".card1", function(){
    let selectedMOvieCard = $(this).data("imdbid")
    $(".page2").css("filter","blur(3px)")
    $(".section3").css("display", "flex")
    getMovieBYId(selectedMOvieCard)
})



function getMovieBYId(id){
    url =  `http://www.omdbapi.com/?i=${id}&apikey=16aaff8a`
    fetch(url).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data.ratings);
        $(".section3").empty();
        if(data.Response== "True" ){
            $(".section3").append(`
            <div class="page3">
            <img class="imageDescription" src="${data.Poster}" alt="">
   
      
            <div class="movieInfo">
        
        
               <h1 class="movieNameHeading">
                   ${data.Title}
               </h1>
        
        
               <div class="movieTimings">
                <p class="movieDuration">${data.Runtime}</p>
                <p class="typeComedy">${data.Genre}</p>
                <p class="moviDate">${data.Released}</p>
               </div>
        
        
               <div class="storyLineInfo">
               ${data.Plot}
               </div>
        
        
               <div class="directorInfo">
                   <p class="director"> <span>Director:</span> ${data.Director}</p>
                   <p class="actor"> <span>Actor:</span>${data.Actors}</p>
                   <p class="Box office"> <span>Box-office:</span> ${data.BoxOffice}</p>
               </div>
        
               <div class="trailer">
                   <a href="">View trailer on Youtube</a>
               </div>
        
        
               <div class="ratingBox">
        
                <div class="internetRating">

                <img  class="imbdImg" src="images/tt0124112" alt="">
                    
                     <div class="imbdContent">
                     <p class="interRating">${data.imdbRating}</p>
                     <p class="ratingInternet">Internet Movie Database</p>
                    </div>
        
                   </div>
               </div>
            </div>
            <div class="closeButton"><i class="fas fa-times"></i></div>
            </div>
        
            `)
            // data.Ratings.forEach(e=>{

            //    $(".rottenRating").append(`  <img class="rottenImg" src="images/37945.jpg" alt="">
            //    <div class="rottenContent">
            //        <p class="rottenValue">${ele.Source} : ${ele.Value}</p>
            //        <p class="ratingName">Internet Movie Database</p>
            //    </div>`)

              
            // })
        }
    })
}


$(document).on("click" ,".closeButton" , function(){
    $(".section3").hide()
    $(".page2").css("filter" , "blur()")
})

$(".launch").on("click" , function(){
    $(".backgroundImg").css("display","none");
    $(".page2").css("display","block")
})

$(".nextButton").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".heading").offset().top
    }, 600);
});

$(".prevButton").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".heading").offset().top
    }, 600);
});

























































//  function getMovies(page=1){
//     let query = $(".nameInput").val()
//     fetch(` http://www.omdbapi.com/?s=${$("").val(query)}&type=${$(".type").val()}&page=${page}&apikey=16aaff8a`).then(res=> res.json())
//     .then(data => {
//         console.log(data);
//         $(".list").empty()
//         // $(".discription").empty()
//      if(data.Response === 'True'){
//         data.Search.forEach(e => {
            // $('.list').append(`
              
            //                <div class="movieCard">
            //                    <div class="card1">
            //                       <img src="${movieimage}" alt="">
            //                      <p>${movieName}</p>
            //                    </div>
            //                </div>
                          
            
            //                `)
//         });

        

//        if(page==1 && data.totalResults > 10){
//            $(".prev,.next").show()
//            totalPages = Math.ceil(data.totalResults/10)
//        }
//         }else{
//             $(".prev,.next").hide()
//             alert('no result');
//         }
       
//     })
// }//end getMovies


// $(".next").on("click",function(){
//     if(currentPage < totalPages){
//         currentPage++;
//         getMovies(currentPage);
//     }
//     if(currentPage === totalPages-1) $(".next").hide()

// })

// $(".prev").on("click",function(){
//     if(currentPage >= 2){
//         currentPage--;
//         getMovies(currentPage);
//     }
// })













// function getMovies(page){
//     let query = $(".nameInput").val()
//     url = `http://www.omdbapi.com/?s=${query}&page=${page}&apikey=16aaff8a`
//     fetch(url).then(response =>{
//         return response.json();
//     }).then(data=>{
        
//            $('.list').empty()
          
//            if(data.Response == "True"){
              
//           totalpage = Math.ceil(data.totalResults/10);
//           console.log(totalpage)
//         for(i=0; i< data.Search.length; i++){
//             let movieName = data.Search[i].Title;
//             let movieimage = data.Search[i].Poster
            
//               $('.list').append(`
              
//               <div class="movieCard">
//                   <div class="card1">
//                      <img src="${movieimage}" alt="">
//                      <p>${movieName}</p>
//                   </div>
//               </div>
              

//               `)
//            }
           
//            if(page==1 && data.totalResults > 10){
//             $(".prev,.next").show()
//             totalPages = Math.ceil(data.totalResults/10)
//         }
//         }else{
//             $(".prev,.next").hide()
//             alert('no result');
//         }
        
//         })
// }//end getmovie




// var currentPage = 1;


// $(".next").on("click",function(){
//     if(currentPage < totalPages){
//         currentPage++;
//         getMovies(currentPage);
//     }
//     if(currentPage === totalPages-1) $(".next").hide()

// })

// $(".prev").on("click",function(){
//     if(currentPage >= 2){
//         currentPage--;
//         getMovies(currentPage);
//     }
// })





