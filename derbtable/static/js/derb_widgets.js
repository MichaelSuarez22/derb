var CategoryClass={
'mifuncion' : function(instance){
return function(e){}
},
'render_data': function(parent, data){

    let template = '<div id="{{it.qid}}" data-manager="derb" data-category="category" class="category">{{it.title}}<div class="children"></div></div>'
    let qid=(Math.random()+1).toString(36).substring(7)});
    let result =  Sqrl.render(template, {title: data.title, id: qid});
    let bodydiv = $("#"+parent+" .children").append(result);
    bodydiv.on('acaelevento',this.mifuncion(this));
    bodydiv.append(result);
    return qid;
},

}

var NumberClass={
'render_data': function(parent, data){},

}

var BooleanClass={
'render_data': function(parent, data){},

}

var ConditionClass={
'render_data': function(parent, data){},

}


