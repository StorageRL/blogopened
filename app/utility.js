module.exports = {
get_random_str: function(len){
var text = "";
var possible = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghiklmnopqrstvxyz0123456789";

for (var i=0; i< len; i++){
text += possible.charAt(
Math.floor(Math.random() * possible.length)
);
}
return text;
}
}