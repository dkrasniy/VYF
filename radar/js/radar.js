
//$( document ).ready(function() {

// ------ Table scrolling and fit ------ // 
let scrollWrapperWidth = $('.scrollWrapper').outerWidth();
let swipeCounter = 0;
let swipePos = 0;
let yearColumns = 3;
let possibleScrolls = 0;

let pdftype="";

function initialize()
{

    $(document).click(function(e) {
    if ($(e.target).closest('.dropdown-toggle').length === 0) {
        // Close all open toggles if any open
        $('.dropdown-content').removeClass("show");
    }

    // if ($(e.target).closest('#radarFilter').length === 0 && $(e.target).closest('.toggle-filter').length === 0) {
    //     // Close all open toggles if any open
    //     $('#radarFilter').removeClass("visible");
    // }



});
    
    //$("body").toggleClass("power-desc-expanded");
    
   
// ------ Loop through all items and add quarter/year class to element  ------ // 
$('.innerWrapper').each(function() {
    //STARTING QUARTER
    let Q = 1;
    //STARTING YEAR
    let Y = 2017;

    $(this).children().each(function() {
        if (!$(this).hasClass("FYheader")) {
            $(this).addClass("Y" + Y + " Q" + Q)
        }
        if (Q >= 4) {
            Q = 1;
            Y++;
        } else {
            Q++;
        }
    })
});






showYears(yearColumns);


$( window ).resize(function() {    
    showYears(yearColumns);
    calculateDocumentOpenWidth();
  });





function calculateDocumentOpenWidth() {
    var overlaySidebarWidth = $('.overlaySidebar').outerWidth();
    var documentWidth = $( window ).width();
    $('.document-viewer-container').css('width',(documentWidth  - (overlaySidebarWidth)+ 'px'));
}


$('#viewDocument1').click(function(e) {
   e.preventDefault();
   $('body').addClass('document-open');
   calculateDocumentOpenWidth();

 })

 $('.document-viewer-container .close').on("click",function(){
   $('body').removeClass('document-open');
}); 

// ------ More details toggle ------ //  

$('.data-holder').on("click",'.liToggle',function() {
	
	
	var cppId = $(this).data("cppid");
	
	var tpyear = $(this).data("tpyear");
	var tpmonth = $(this).data("tpmonth");
	
	
	//console.log("logging now "+grpId);
	
	getAgendaData(cppId,tpyear,tpmonth);

    // Close all other sidebars if any open
    //$('.overlaySidebar.visible').removeClass("visible");

   // $(".agenda-data-holder.overlaySidebar").addClass("visible");
	$(".agenda-data-holder").addClass("visible");
	
	$('body').toggleClass('sidebar-open');
    
    console.log("added visible");
});





$('#calviewbtn').on("click", function(){
	getCalendarView();
})



$('.toggle-desc-truncate').on("click", function(){
    $("body").toggleClass("power-desc-expanded")
})
$('.toggle-powers-width').on("click", function(){
    $("body").toggleClass("specific-powers-collapse ")
    showYears(yearColumns);
})


$('.showyears').on("click",function() {
	

	var year = $(this).data("yrs");
	
	
	//console.log("logging now "+grpId);
	
	showYears(year);

    // Close all other sidebars if any open
    //$('.overlaySidebar.visible').removeClass("visible");

   // $(".agenda-data-holder.overlaySidebar").addClass("visible");
	
    
    
});

$('.translatetable').on("click",function() {
	

	var direction = $(this).data("direction");
	
	
	//console.log("logging now "+grpId);
	
	translateTable(direction);

    // Close all other sidebars if any open
    //$('.overlaySidebar.visible').removeClass("visible");

   // $(".agenda-data-holder.overlaySidebar").addClass("visible");
	
    
    
});


$('.FYQheader').on("click",function() {
	
	
    console.log($(this));
	var year = $(this).data("yr");
	var qtr = $(this).data("qtr");

	
	
	//console.log("logging now "+grpId);
	
	getAgendaDataByQtr(year,qtr);

    // Close all other sidebars if any open
    //$('.overlaySidebar.visible').removeClass("visible");

   // $(".agenda-data-holder.overlaySidebar").addClass("visible");
	$(".agenda-data-holder").addClass("visible");
	
	
    
    console.log("added visible");
});







$('.agenda-data-holder').on("click",".pdfviewerclass",function() {
    
	var pdfurl = $(this).data("url");
	
	pdftype =1;
	
	showPDFDoc(pdfurl);
    
})

$('.agenda-data-holder').on("click",".staticpdfviewerclass",function() {
    
	var pdfurl = $(this).data("url");
	
	pdftype =0;
	
	showPDFDoc(pdfurl);
	
	//showStaticPDFDoc(pdfurl);
    
})




$('.agenda-data-holder').on("click",".close",function() {
    
	console.log("remove sidebar");
    $('body').toggleClass('sidebar-open');
    $('.agenda-data-holder.visible').removeClass("visible");
   // $('.overlaySidebar.radar-filter').removeClass("visible");
})

$('.search-data-holder').on("click",".close",function() {
    
	console.log("remove search sidebar");
    $('body').toggleClass('sidebar-open');
    $('.search-data-holder.visible').removeClass("visible");
   // $('.overlaySidebar.radar-filter').removeClass("visible");
})

$('.glossary-data-holder').on("click",".close",function() {
    
	console.log("remove glossary sidebar");
    $('body').toggleClass('sidebar-open');
    $('#glossarysidebar').removeClass("visible");
   // $('.overlaySidebar.radar-filter').removeClass("visible");
})


//showPDFDoc

$('.overlaySidebar.radar-filter').on("click",".close",function() {
    // Remove visible class from all sidebars
	console.log("remove filterbar");
    //$('body').toggleClass('document-open');
    $('.overlaySidebar.radar-filter').removeClass("visible");
    $('body').removeClass("sidebar-open");
})




$('.toggle-filter').click(function(e) {

    console.log(e);

    $('.agenda-data-holder.visible').removeClass("visible");

    $('#radarFilter').addClass("visible");
    
    //$('.overlaySidebar.visible').removeClass("visible")

    //$('#radarFilter').addClass("visible")
    $('body').addClass("sidebar-open");
});

$('.toggle-glossary').click(function(e) {

    console.log(e);

   

    $('#glossarysidebar').addClass("visible");
    
    

    //$('#radarFilter').addClass("visible")
    $('body').addClass("sidebar-open");
});



$('.applied-filters').on("click",'.remove-filter',function() {
	
	var parentelemid = $(this).parent().attr('id');
	var filtercheckboxid = $(this).parent().data('fid');
	if(filtercheckboxid=="to" || filtercheckboxid=="from")
	{
		$("#"+filtercheckboxid).datepicker('setDate', null);
	}
	else
	{
	$('#'+filtercheckboxid).prop('checked', false);
	}
	
	
	   //alert("remove element");
     removeFilterElement(filtercheckboxid);
     
     return false;
	
         
});

$('.filterchckbox').change(function() {
	
	var elemid = $(this).attr('id');
	var value = $(this).attr('value');
	var parentcontainerId = $(this).data('filterid');
    if($(this).is(":checked")) {
        //alert("add element");
    	addFilterElement(elemid,value,parentcontainerId);
    }
    else
	{
	   //alert("remove element");
    	removeFilterElement(elemid);
	}
         
});

$('.dtpickfiler').change(function() {
	
	var elemid = $(this).attr('id');
	var value = $(this).val();
	var parentcontainerId = $(this).data('filterid');
	
	removeFilterElement(elemid);
    if(value!='') {
        
    	addFilterElement(elemid,value,parentcontainerId);
    }
    else
	{
	   //alert("remove element");
    	$("#"+elemid).datepicker('setDate', null);
    	
	}
         
});





function addFilterElement(id,value,parentcontainerId)
{
	
	var nodeid = "flnode"+id;
	var nodehtml = '<span class="inline-block bg-grey-lighter rounded px-3 py-1 text-sm font-semibold text-grey-darkest mr-2" id="'+nodeid+'" data-fid="'+id+'">'+value+
	'<a class="text-grey remove-filter ml-2" href="#" title="Remove filter"><i class="fas fa-times"></i></a></span>';
	
	//add to applied filters node
	
	$("#"+parentcontainerId).append(nodehtml);
    
}

function removeFilterElement(id)
{
	var elemid ="#flnode"+id;
	$(elemid).remove();
}




function filterItems() {
    $("input:checkbox[name=programName]:not(:checked)").each(function() {
        $('ul.innerDataUl li.' + $(this).val()).addClass("not-checked")

    });
    $("input:checkbox[name=programName]:checked").each(function() {
        $('ul.innerDataUl li.' + $(this).val()).removeClass("not-checked")

    });
    $('.table-scroll').addClass("filter-applied")
}


$('.filter-program-btn').click(function() {
    $('.program-filer').toggleClass("visible")
})
$('#programFilter .btn').click(function() {
    $('.program-filer').toggleClass("visible")
})


$(document).keydown(function(e) {
    //on arrow left 
    if (e.keyCode == 37)
        translateTable('left');
    //arrow right
    if (e.keyCode == 39)
        translateTable('right');
});


$('.dropdown-toggle').click(function(e) {
    let dropdownTarget = e.currentTarget.dataset.target;


    // Close all open toggles if any open
    $('.dropdown-content').removeClass("show")

    $("#" + dropdownTarget).addClass("show")


})

$("#applyfiler").click(function(e){
	applyFilters();


})


//tabs nav
$('.tabs-nav li a').click(function(e){    
    e.preventDefault();
    var t = e.currentTarget.dataset.target; 

    if(!$(this).hasClass('active')){ //this is the start of our condition 
      $('.tabs-nav li a').removeClass('active');           
      $(this).addClass('active');

      $('.tab-content').removeClass('active');           
      $('#'+t).addClass('active');
   }
  });



  
}



function showYears(yearsAmount) {
  
    scrollWrapperWidth = $('.scrollWrapper').outerWidth();
    possibleScrolls = ((8)-yearsAmount);

    if(swipeCounter >= possibleScrolls){
        swipeCounter = possibleScrolls;
    }

    yearColumns = yearsAmount;

    if (yearsAmount == 1) {
        $("body").addClass("oneYearView")
    } else {
        $("body").removeClass("oneYearView")
    }

    
    let yearWidth = scrollWrapperWidth / yearsAmount;
    let quarterWidth = yearWidth / 4;



    toggleArrows();

    $('.innerWrapper').css('transform', 'translateX(' + (-1 * yearWidth * swipeCounter) + 'px)');
    $('.innerWrapper').css('grid-template-columns', 'repeat(32, ' + (quarterWidth) + 'px)');

    //disable animation to avoid jump
    $('.innerWrapper').css('transition', '0s');
    
    $('.current-quarter-line').css('transition', '0s');


    alignCurrentYearLine();






$('.tabs-nav li a').click(function(e){
    if(this.checked) {
     
   }	    
});
    

}

function toggleArrows(){
    //show left arrow if swiped 
    (swipeCounter!=0 ? $('.arrow-left').addClass("visible") : $('.arrow-left').removeClass("visible"))

    if (swipeCounter == possibleScrolls){
        $('.arrow-right').removeClass("visible") 
    } else {
        $('.arrow-right').addClass("visible")
        
    }
}


function translateTable(dir) {

    let yearWidth = scrollWrapperWidth / yearColumns;
    
    if (dir == "left" && swipeCounter > 0) {
        swipePos += yearWidth;
        swipeCounter--;

        $('.scrollWrapper').removeClass("swipePosition"+(swipeCounter+1));
        $('.scrollWrapper').addClass("swipePosition"+(swipeCounter));
    }

    if (dir == "right" && swipeCounter < possibleScrolls) {
        swipePos -= yearWidth;
        swipeCounter++;

        $('.scrollWrapper').removeClass("swipePosition"+(swipeCounter-1));
        $('.scrollWrapper').addClass("swipePosition"+(swipeCounter));
    }

    //aninmate translation 
    $('.innerWrapper').css('transition', '.3s');

    //translate table
    $('.innerWrapper').css('transform', 'translateX(' + (-1*swipeCounter*yearWidth) + 'px)');
    

    $('.current-quarter-line').css('transition', '.3s');
   $('.current-quarter-line').css('transform', 'translateX(' + (-1*swipeCounter*yearWidth) + 'px)');


    
    toggleArrows();

}

/*
function alignCurrentYearLine(quarterWidth)  {
   let currentBox = $('.FYQheader.current').offset();
   $('.current-quarter-line').css('left', (currentBox.left)+(quarterWidth/2)-2);
}
*/



function alignCurrentYearLine()  {

    $('.current-quarter-line').css('left', '10px');
}


//Jan 16 2019
var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      //runSearchQuery(searchInput.value)
      //openSearch();
    	getSearchResults(searchInput.value);
      document.getElementById("searchButton").click();
    }
  });

  
  $('#searchInputModal').on("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        runSearchQuery(searchInputModal.value);
        document.getElementById("searchButtonModal").click();
      }
  });
  
  
  $('#logout').on("click", function(event) {
	    event.preventDefault();
	    logout();
	  });

  function runSearchQuery(searchValue){
    $('.search-query').html("\"" + searchValue + "\"");
    document.getElementById("searchInputModal").value = searchValue;
    document.getElementById("searchInput").value = searchValue;
  }

  function openSearch(){
    $('.overlaySidebar.visible').removeClass("visible");
    $('#searchFilter').addClass("visible");
    $('body').addClass("sidebar-open");
  }
  
  function filterList(e) {
	    var idToFilter = e.getAttribute("data-filter-id")
	    var input = document.getElementById(e.getAttribute("id"));
	    var filter  = input.value.toUpperCase();

	     var filterListParent = document.getElementById(idToFilter);
	    var li = filterListParent.getElementsByTagName("div");

	     for (i = 0; i < li.length; i++) {
	        a = li[i].getElementsByTagName("label")[0];
	        txtValue = a.textContent || a.innerText;
	        if (txtValue.toUpperCase().indexOf(filter) > -1) {
	            li[i].style.display = "";
	        } else {
	            li[i].style.display = "none";
	        }
	    }
	}

function filterGlossary(e) {
    var idToFilter = e.getAttribute("data-filter-id")
    var input = document.getElementById(e.getAttribute("id"));
    var filter  = input.value.toUpperCase();

    var filterListParent = document.getElementById(idToFilter);
    var li = filterListParent.getElementsByTagName("li");


    for (i = 0; i < li.length; i++) {
        a = li[i].children[0];

        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


$('.event-data-holder').on("click",'ol a',function(e) {
    e.preventDefault();
    var a = this;
    var href = a.getAttribute("href")


    showPDFDoc(href);

});