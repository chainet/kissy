/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Oct 11 19:24
*/
KISSY.add("kison/grammar",function(d,j,g,a,b,c,f,h){function o(l){var a=0,e;for(e in l)a++;return a}function t(l,a){for(var e=0;e<a.length;e++)if(l.equals(a[e]))return e;return-1}function s(){s.superclass.constructor.apply(this,arguments);this.buildTerminals();this.buildNonTerminals();this.buildNullAble();this.buildFirsts();this.buildItemSet();this.buildLalrItemSets();this.buildTable()}function v(l){var a=this.lexer,e,m,i=this.table,b=i.gotos,i=i.action,n=this.productions,c=[null],k=[0];for(a.resetInput(l);;){l=
k[k.length-1];e||(e=a.lex());if(!e)return!1;m=i[l]&&i[l][e];if(!m){var g=[];i[l]&&d.each(i[l],function(a,l){g.push(l)});return!1}switch(m.type){case p:k.push(e);c.push(a.text);k.push(m.to);e=null;break;case q:var f=n[m.production],l=f.symbol;m=f.action;var h=f.rhs.length;this.$$=f=c[c.length-h];for(f=0;f<h;f++)this["$"+(h-f)]=c[c.length-1-f];var j;m&&(j=m.call(this));f=void 0!==j?j:this.$$;h&&(k=k.slice(0,-2*h),c=c.slice(0,-1*h));k.push(l);c.push(f);k.push(b[k[k.length-2]][k[k.length-1]]);break;case r:return f}}}
var p=1,q=2,r=0,u=d.mix;d.extend(s,j,{buildTerminals:function(){var a=this.get("lexer"),a=a&&a.rules,b=this.get("terminals");b.$EOF=1;d.each(a,function(a){a.token&&(b[a.token]=1)})},buildNonTerminals:function(){var a=this.get("terminals"),b=this.get("nonTerminals"),e=this.get("productions");d.each(e,function(e){var i=e.get("symbol"),f=b[i];f||(f=b[i]=new c({symbol:i}));f.get("productions").push(e);d.each(e.get("handles"),function(e){!a[e]&&!b[e]&&(b[e]=new c({symbol:e}))})})},buildNullAble:function(){for(var a=
this,b,e,c,i,f,n,g,k=a.get("nonTerminals"),h=!0;h;)for(i in h=!1,d.each(a.get("productions"),function(d){if(!d.get("nullAble")){e=d.get("rhs");for(c=b=0;f=e[b];++b)a.isNullAble(f)&&c++;c===b&&d.set("nullAble",h=!0)}}),k)if(!k[i].get("nullAble")){g=k[i].get("productions");for(b=0;n=g[b];b++)if(n.get("nullAble")){k[i].set("nullAble",h=!0);break}}},isNullAble:function(a){var b=this.get("nonTerminals");if(a instanceof Array){for(var b=0,e;e=a[b];++b)if(!this.isNullAble(e))return!1;return!0}return b[a]?
b[a].get("nullAble"):!1},findFirst:function(a){var b={},e,d,i=this.get("nonTerminals");if(a instanceof Array){for(d=0;(e=a[d])&&!(i[e]?u(b,i[e].get("firsts")):b[e]=1,!this.isNullAble(e));++d);return b}return i[a]?i[a].get("firsts"):[a]},buildFirsts:function(){var a=this,b;a.get("productions");for(var e=a.get("nonTerminals"),c=!0,i,f;c;)for(i in c=!1,d.each(a.get("productions"),function(b){var e=a.findFirst(b.get("rhs"));o(e)!==o(b.get("firsts"))&&(b.set("firsts",e),c=!0)}),e)b=e[i],f={},d.each(b.get("productions"),
function(a){u(f,a.get("firsts"))}),o(f)!==o(b.get("firsts"))&&(b.set("firsts",f),c=!0)},closure:function(b){for(var c=this,e=b.get("items"),f=c.get("productions"),i=1;i;)i=!1,d.each(e,function(e){var n=e.get("dotPosition"),g=e.get("production").get("rhs"),k=g[n],e=e.get("lookAhead"),h={};d.each(e,function(a,b){var e=g.slice(n+1);e.push(b);d.mix(h,c.findFirst(e))});d.each(f,function(e){if(e.get("symbol")==k){var e=new a({production:e}),d=b.findItemIndex(e,!0);-1!=d?(e=b.getItemAt(d),i=i||!!e.addLookAhead(h)):
(e.addLookAhead(h),b.addItem(e),i=!0)}})});return b},gotos:function(c,f){var e=new b,g=c.get("items");d.each(g,function(b){var d=b.get("production"),c=b.get("dotPosition");d.get("rhs")[c]==f&&(d=new a({production:d,dotPosition:c+1}),c=e.findItemIndex(d,!0),-1!=c?(d=e.getItemAt(c),d.addLookAhead(b.get("lookAhead"))):(d.addLookAhead(b.get("lookAhead")),e.addItem(d)))});return this.closure(e)},findItemSetIndex:function(a){for(var b=this.get("itemSets"),e=0;e<b.length;e++)if(b[e].equals(a))return e;return-1},
buildItemSet:function(){var c=this,f=c.get("itemSets"),e={},g=c.get("productions");e.$EOF=1;e=c.closure(new b({items:[new a({production:g[0],lookAhead:e})]}));f.push(e);var i=!0,h=d.merge(c.get("terminals"),c.get("nonTerminals"));for(delete h.$EOF;i;)i=!1,e=f.concat(),d.each(e,function(a){d.each(h,function(b,e){a.__cache||(a.__cache={});if(!a.__cache[e]){var d=c.gotos(a,e);a.__cache[e]=1;if(0!=d.size()){var g=c.findItemSetIndex(d);-1<g?d=f[g]:(f.push(d),i=!0);a.get("gotos")[e]=d;d.addReverseGoto(e,
a)}}})})},buildLalrItemSets:function(){for(var a=this.get("itemSets"),b=0;b<a.length;b++)for(var e=a[b],c=b+1;c<a.length;c++){var f=a[c];if(e.equals(f,!0)){for(var g=0;g<e.get("items").length;g++)e.get("items")[g].addLookAhead(f.get("items")[g].get("lookAhead"));var h=e.get("gotos");d.each(f.get("gotos"),function(a,b){h[b]=a;a.addReverseGoto(b,e)});d.each(f.get("reverseGotos"),function(a,b){d.each(a,function(a){a.get("gotos")[b]=e;e.addReverseGoto(b,a)})});a.splice(c--,1)}}},buildTable:function(){var a=
this.get("table"),b=this.get("itemSets"),e=this.get("productions"),c={},f={};a.gotos=c;a.action=f;for(var g=this.get("nonTerminals"),h=0;h<b.length;h++)a=b[h],d.each(a.get("gotos"),function(a,e){g[e]?(c[h]=c[h]||{},c[h][e]=t(a,b)):(f[h]=f[h]||{},f[h][e]={type:p,to:t(a,b)})}),d.each(a.get("items"),function(a){var b=a.get("production");a.get("dotPosition")==b.get("rhs").length&&("$START"==b.get("symbol")?a.get("lookAhead").$EOF&&(f[h]=f[h]||{},f[h].$EOF={type:r}):(f[h]=f[h]||{},d.each(a.get("lookAhead"),
function(a,c){f[h][c]={type:q,production:d.indexOf(b,e)}})))})},visualizeTable:function(){var a=this.get("table"),b=a.gotos,a=a.action,e=this.get("productions"),c=[];d.each(this.get("itemSets"),function(a,b){c.push(Array(70).join("*")+" itemSet : "+b);c.push(a.toString());c.push("")});c.push("");c.push(Array(70).join("*")+" table : ");d.each(a,function(a,b){d.each(a,function(a,d){var f,g=a.type;g==r?f="acc":g==q?(f=e[a.production],f="r, "+f.get("symbol")+"="+f.get("rhs").join(" ")):g==p&&(f="s, "+
a.to);c.push("action["+b+"]["+d+"] = "+f)})});c.push("");d.each(b,function(a,b){d.each(a,function(a,e){c.push("goto["+b+"]["+e+"] = "+a)})});return c},genCode:function(){var a=this.get("table"),b=this.get("lexer"),c=[];d.each(this.get("productions"),function(a){c.push({symbol:a.get("symbol"),rhs:a.get("rhs"),action:a.get("action")})});var f=[];f.push("/* Generated by kison from KISSY */");f.push("var parser={},S=KISSY,REDUCE_TYPE="+q+",SHIFT_TYPE="+p+",ACCEPT_TYPE="+r+";");f.push(b.genCode());f.push("parser.lexer=lexer;");
f.push("parser.productions="+g.serializeObject(c)+";");f.push("parser.table="+g.serializeObject(a)+";");f.push("parser.parse="+v.toString()+";");f.push("return parser;");return f.join("\n")}},{ATTRS:{table:{value:{}},itemSets:{value:[]},productions:{value:[],setter:function(a){a.unshift({symbol:"$START",rhs:[a[0].symbol]});d.each(a,function(b,c){a[c]=new h(b)})}},nonTerminals:{value:{}},lexer:{setter:function(a){if(!(a instanceof f))return new f(a)}},terminals:{value:{}}}});return s},{requires:"base,./utils,./item,./item-set,./non-terminal,./lexer,./production".split(",")});
KISSY.add("kison/item-set",function(d,j){function g(){g.superclass.constructor.apply(this,arguments)}d.extend(g,j,{addItem:function(a){for(var b=this.get("items"),c=0;c<b.length&&!(b[c].get("production").toString()>a.get("production").toString());c++);b.splice(c,0,a)},size:function(){return this.get("items").length},findItemIndex:function(a,b){for(var c=this.get("items"),f=0;f<c.length;f++)if(c[f].equals(a,b))return f;return-1},getItemAt:function(a){return this.get("items")[a]},equals:function(a,
b){var c=this.get("items"),f,d=a.get("items");if(c.length!=d.length)return!1;for(f=0;f<c.length;f++)if(!c[f].equals(d[f],b))return!1;return!0},toString:function(){var a=[];d.each(this.get("items"),function(b){a.push(b.toString())});return a.join("\n")},addReverseGoto:function(a,b){var c=this.get("reverseGotos");c[a]=c[a]||[];c[a].push(b)}},{ATTRS:{items:{value:[]},gotos:{value:{}},reverseGotos:{value:{}}}});return g},{requires:["base"]});
KISSY.add("kison/item",function(d,j){function g(){g.superclass.constructor.apply(this,arguments)}d.extend(g,j,{equals:function(a,b){return!a.get("production").equals(this.get("production"))||a.get("dotPosition")!=this.get("dotPosition")||!b&&!d.equals(this.get("lookAhead"),a.get("lookAhead"))?!1:!0},toString:function(a){return this.get("production").toString(this.get("dotPosition"))+(a?"":","+d.keys(this.get("lookAhead")).join("/"))},addLookAhead:function(a){var b=this.get("lookAhead"),c=0;d.each(a,
function(a,d){b[d]||(c=b[d]=1)});return c}},{ATTRS:{production:{},dotPosition:{value:0},lookAhead:{value:{}}}});return g},{requires:["base"]});KISSY.add("kison",function(d,j,g,a){d={};d.Grammar=j;d.Production=g;d.Lexer=a;return d},{requires:["kison/grammar","kison/production","kison/lexer"]});
KISSY.add("kison/lexer",function(d,j){var g=function(a){this.rules=[];d.mix(this,a);d.each(this.rules,function(a){a.state||(a.state=g.STATIC.INIT)});this.resetInput(this.input)};g.STATIC={INIT:d.guid("init"),DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};g.prototype={resetInput:function(a){this.input=a;d.mix(this,{matched:"",stateStack:[g.STATIC.INIT],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},genCode:function(){var a=[];a.push("var Lexer = "+g.toString()+";");a.push("Lexer.prototype= "+
j.serializeObject(g.prototype,/genCode/)+";");a.push("Lexer.STATIC= "+j.serializeObject(g.STATIC)+";");a.push("var lexer = new Lexer("+j.serializeObject({rules:this.rules})+");");return a.join("\n")},getCurrentRules:function(){var a=this.stateStack[this.stateStack.length-1],b=[];d.each(this.rules,function(c){c.state==a&&b.push(c)});return b},pushState:function(a){this.stateStack.push(a)},popState:function(){this.stateStack.pop()},showDebugInfo:function(){var a=g.STATIC.DEBUG_CONTEXT_LIMIT,b=this.matched,
c=this.match,d=this.input,b=b.slice(0,b.length-c.length),b=(b.length>a?"...":"")+b.slice(-a).replace(/\n/," "),c=c+d,c=c.slice(0,a)+(c.length>a?"...":"");return b+c+"\n"+Array(b.length+1).join("-")+"^"},lex:function(){var a=this.input,b,c,f,h=this.getCurrentRules();this.match=this.text="";if(!d.trim(a))return g.STATIC.END_TAG;for(b=0;b<h.length;b++)if(c=h[b],f=a.match(c.regexp)){if(b=f[0].match(/\n.*/g))this.lineNumber+=b.length;d.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,
lastColumn:b?b[b.length-1].length-1:this.lastColumn+f[0].length});b=this.match=f[0];this.matches=f;this.text=b;this.matched+=b;f=c.action&&c.action.call(this);void 0==f&&(f=c.token);this.input=a=a.slice(b.length);return f?f:this.lex()}}};return g},{requires:["./utils"]});KISSY.add("kison/non-terminal",function(d,j){function g(){g.superclass.constructor.apply(this,arguments)}d.extend(g,j,{},{ATTRS:{productions:{value:[]},firsts:{value:{}},symbol:{},nullAble:{value:!1}}});return g},{requires:["base"]});
KISSY.add("kison/production",function(d,j){function g(){g.superclass.constructor.apply(this,arguments)}d.extend(g,j,{equals:function(a){return!d.equals(a.get("rhs"),this.get("rhs"))?!1:a.get("symbol")==this.get("symbol")},toString:function(a){var b="",c=this.get("rhs");d.each(c,function(c,d){d==a&&(b+=".");b+=c});a==c.length&&(b+=".");return this.get("symbol")+"=>"+b}},{ATTRS:{firsts:{value:{}},follows:{value:[]},symbol:{},rhs:{value:[]},nullAble:{value:!1},action:{}}});return g},{requires:["base"]});
KISSY.add("kison/utils",function(d){return{serializeObject:function g(a,b){var c=[];if(d.isString(a))return'"'+a+'"';if(d.isNumber(a))return a+"";if(d.isRegExp(a))return"/"+a.source+"/"+(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"");if(d.isArray(a))return c.push("["),d.each(a,function(a,b){c.push((b?",":"")+g(a))}),c.push("]"),c.join("\n");if(d.isObject(a)){var c=["{"],f=!0,h;for(h in a)if(!b||!h.match(b))c.push((f?"":",")+'"'+h+'": '+g(a[h],b)),f=!1;c.push("}");return c.join("\n")}return a+
""}}});