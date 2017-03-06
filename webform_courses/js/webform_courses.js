/* requires jQuery */

(function ($) {

$(document).ready(function () {
  var allFields = {};

/* set up autocomplete on all titles and course number fields*/
for(var i = 1; i < 8; i++){
  initCourseAutocomplete(i);
}


function initCourseAutocomplete(num){
  $("#edit-submitted-course-"+num+"-course-no"+num).autocomplete({
        delay: 100,
        minLength: 4,
        source: function (request, response) {
        var suggestURL = "http://gallatin.nyu.edu/content/gallatin/en/academics/courses/jcr:content/content/search.json?callback=getcourses&query=%QUERY"; 
          suggestURL = suggestURL.replace('%QUERY', request.term);
          getMatches(allFields, request, response,suggestURL,"course");

        },
        select: function(value, data){ 

          setOtherFields(allFields[data.item.label], "course", "edit-submitted-course-"+num+"-", num);
          allFields = {};
        }
    });

 $("#edit-submitted-course-"+num+"-course-title"+num).autocomplete({
        delay: 100,
        minLength: 4,
        source: function (request, response) {
            var suggestURL = "http://gallatin.nyu.edu/content/gallatin/en/academics/courses/jcr:content/content/search.json?callback=getcourses&title=%QUERY"; 
            suggestURL = suggestURL.replace('%QUERY', request.term);
            getMatches(allFields, request, response,suggestURL,"title");

        },
        select: function(value, data){ 

          setOtherFields(allFields[data.item.label], "title", "edit-submitted-course-"+num+"-", num);
          allFields = {};
        }
    });
}


function setOtherFields(data, field, prefix, suffix){
  if(field != ("title")){
    $("#" + prefix + "course-title"  + suffix).val(data.title);
    console.log("#" + prefix + "course-title"  + suffix);
  }
  if(field !=("course")){
    $("#" + prefix + "course-no" + suffix).val(data.course + " " + data.section);
  }

  if(field !=("days")){
    $("#" + prefix + "days"  + suffix).val(data.days);
  }

  if(field !=("class")){
    $("#" + prefix + "class-no" + suffix).val(data.class);
  }

  if(field !=("units")){
    $("#" + prefix + "units" + suffix).val(data.credit);
  }

}


function getMatches(bucket, request, response, url, field){
  var matches = [];
  $.ajax({
                url: url,
               /* beforeSend: function(xhr){
                    console.log("before send:" + request.term);
                },*/
                dataType: 'jsonp',
                crossDomain: true,
                jsonpCallback: "getcourses",
                success: function (data) {
                  getField(bucket, data,field);
                  for (var k2 in bucket) {
                    matches.push(unescape(k2));
                  }
                  response( $.ui.autocomplete.filter(
                        matches, request.term  ) );
                },
                error: function (e) {
                    console.log(e);
                }             
  });
}

function getField(bucket, data, field){

	for(var keyNum in data) {   					

      var k = data[keyNum][field];
      var v = data[keyNum];
      bucket[k]= v;

	}

}

});



})(jQuery);
