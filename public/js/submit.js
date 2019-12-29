tinymce.init({ selector:'textarea' });


var submitedge = new Vue({
el: '#submitedge',
data: {
    form:{
_csrf : $('input[name=_csrf]').val(),
title: '',
category:1
    },
submit_show_alert:false,
submit_is_processing:false,
submit_alert_class: '',
submit_alert_msg:''
},
methods:{
submit: function(){
this.submit_is_processing = true;
this.submit_show_alert = true;
this.submit_alert_class= 'infomsg';
this.submit_alert_msg = 'Please wait!';

tinymce.activeEditor.setMode('readonly');

let form_data = new FormData();
form_data.append('_csrf',this.form._csrf);
form_data.append('title', this.form.title);
form_data.append('category', this.form.category);
form_data.append('content', tinymce.activeEditor.getContent());

if(!$("input[type=file").prop('files').length) {
    this.submit_is_processing = false;
    this.submit_alert_class= 'errormsg';
    this.submit_alert_msg = 'Invalid data!';
    tinymce.activeEditor.setMode('design');
    return null;

}

form_data.append('img', $("input[type=file").prop('files')[0]);


$.ajax({
url: '/submit',
data:form_data,
type: 'POST',
cache: false,
contentType: false,
processData: false
}).then((response)=> {
    if (response.status == 2) {
this.submit_alert_class = "successmsg";
this.submit_alert_msg = "Success! You are now being redirected!";
location.href = '/post/' + response.post_id;
    }else{
        this.submit_is_processing = false;
        this.submit_alert_class = "errormsg";
        this.submit_alert_msg= "Invalid info!"
        tinymce.activeEditor.setMode('design');
    }
    
});

}
}
})