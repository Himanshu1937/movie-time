//  api Key = http://www.omdbapi.com/?i=tt3896198&apikey=3bf80026
$("#top .searchFilter select").on("change",function(){
    
    $("#top .searchInput input").attr("placeholder",`Enter ${this.value} Name`)
})

 
var currentPage = 1;

var totalPages = 0;

function getMovies(page=1){
    fetch(` https://www.omdbapi.com/?s=${$(".searchInput input").val()}&type=${$("#top .searchFilter select").val()}&page=${page}&apikey=3bf80026`).then(res=> res.json())
    .then(data => {
        console.log(data);
        $(".cardSection").empty()
        $(".discription").empty()
     if(data.Response === 'True'){
        data.Search.forEach(e => {
            $(".movieList").append(
                `<div data-imdbid=${e.imdbID} class="movieCard">
                <img src="${e.Poster}">
                <p>${e.Title}</p>
            </div>`
            )
        });

        
        

       if(page==1 && data.totalResults > 10){
           $(".previous,.next").show()
           totalPages = Math.ceil(data.totalResults/10)
       }
        }else{
            $(".previous,.next").hide()
            alert('no result');
        }
       
    })
}//end getMovies

$(".searchInput button").on("click",getMovies)
$(".searchInput input").on("keypress",function(e){
    if(e.keyCode === 13){
    getMovies();
}
})
$(".next").on("click",function(){
    if(currentPage < totalPages){
        currentPage++;
        getMovies(currentPage);
    }
    if(currentPage === totalPages-1) $(".next").hide()

})

$(".previous").on("click",function(){
    if(currentPage >= 2){
        currentPage--;
        getMovies(currentPage);
    }
})

function getMovieBYId(id){
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=3bf80026`).then(res => res.json() ).then(
        data => {
            console.log(data)
            $(".discription").empty()
            if(data.Response === "True"){
                $(".discription").append(
                    ` <div class="disPoster">
                    <img src="${data.Poster}">
                    <p class="rate"><span>Ratings: </span>
                    
                    </p>
                </div>
                <div class="disPara">
                    <h1>${data.Title}</h1>
                    <p><span>Genre : </span> ${data.Genre}"</p>
                    <p><span>Runtime : </span> ${data.Runtime}</p>
                    <p><span>Year : </span> ${data.Year} </p>
                    <p><span>Writer : </span> ${data.Writer}</p>
                    <p><span>Director : </span> ${data.Director}</p>
                    <p><span>Actors : </span> ${data.Actors}</p>
                    <p><span>Awards : </span> ${data.Awards}</p>
                </div>`
                )
                data.Ratings.forEach(ele=> {
                    $(".rate").append(`
                    <p>${ele.Source} : ${ele.Value} :</p>`)
                });
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }
       
    
    )
}

$(document).on("click",'.movieCard',function(){
    var a = $(this).data('imdbid');
     getMovieBYId(a);
})
