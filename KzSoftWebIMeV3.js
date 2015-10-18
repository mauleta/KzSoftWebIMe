﻿// JScript source code for write in web kazakh words
/*create and debugging by Nurbol
* E-mail: mauleta@qq.com 
* http://www.kazakhsoft.com
* 2015-03-17. BeiJing.
* can write kazakh words all the web browser. IE, firefox, safari, opera, chrome
*/ 
	var wLanguage = "arb"; // arb or cyrl   arb == قازاقشا cyrl ==  Қазақша
	var wAll = true; // true write all ,false don't write
	var wKz = true;  // true is write kazakh words. ctrl+alt+K
	var wIds = ""; //write these elements example: id1:id2:id3
	var nIds = ""; //don't write these elements example: id1:id3
	var wNames = ""; // write these elements example: name1:name3
	var nNames = ""; //don't write these elements example :name2:name4
	
	var keyArbMap = {"A":"0x2014","a":"0x06BE","B":"0x0628","b":"0x0628","C":"0x0639","c":"0x0639","D":"0x062F",
"d":"0x062F","E":"0x06D5","e":"0x0621","F":"0x0641","f":"0x0627","G":"0x06AF","g":"0x06D5",
"H":"0x062D","h":"0x0649","I":"0x06AD","i":"0x06AD","J":"0x062C","j":"0x0642","K":"0x06C6",
"k":"0x0643","L":"0x0644","l":"0x0644","M":"0x0645","m":"0x0645","N":"0x0646","n":"0x0646",
"O":"0x0648","o":"0x0648","P":"0x067E","p":"0x067E","Q":"0x0686","q":"0x0686","R":"0x0631",
"r":"0x0631","S":"0x0633","s":"0x0633","T":"0x062A","t":"0x062A","U":"0x06C7","u":"0x06C7",
"V":"0x06C6","v":"0x06C6","W":"0x06CB","w":"0x06CB","X":"0x0634","x":"0x0634","Y":"0x064A",
"y":"0x064A","Z":"0x0632","z":"0x0632",";":"0x061B","?":"0x061F",",":"0x060C","<":"0x00BB",
">":"0x00AB","{":"0x007D","}":"0x007B","[":"0x005D","]":"0x005B","(":"0x0029",")":"0x0028"}

var keyCyrlMap = {"A":"0x0424","a":"0x0444","B":"0x0418","b":"0x0438","C":"0x0421","c":"0x0441","D":"0x0412",
"d":"0x0432","E":"0x0423","e":"0x0443","F":"0x0410","f":"0x0430","G":"0x041F","g":"0x043F",
"H":"0x0420","h":"0x0440","I":"0x0428","i":"0x0448","J":"0x041E","j":"0x043E","K":"0x041B",
"k":"0x043B","L":"0x0414","l":"0x0434","M":"0x042C","m":"0x044C","N":"0x0422","n":"0x0442",
"O":"0x0429","o":"0x0449","P":"0x0417","p":"0x0437","Q":"0x0419","q":"0x0439","R":"0x041A",
"r":"0x043A","S":"0x042B","s":"0x044B","T":"0x0415","t":"0x0435","U":"0x0413","u":"0x0433",
"V":"0x041C","v":"0x043C","W":"0x0426","w":"0x0446","X":"0x0427","x":"0x0447","Y":"0x041D",
"y":"0x043D","Z":"0x042F","z":"0x044F",",":"0x0431","<":"0x0411",".":"0x044E",">":"0x042E",
"/":"0x0451",";":"0x0436",":":"0x0416","\"":"0x042D","[":"0x0445","{":"0x0425","]":"0x044A",
"}":"0x042A","`":"0x0028","~":"0x0029","1":"0x0022","!":"0x0021","2":"0x04D9","@":"0x04D8",
"3":"0x0456","#":"0x0406","4":"0x04A3","$":"0x04A2","5":"0x0493","%":"0x0492","6":"0x002C",
"^":"0x003A","7":"0x002E","&":"0x003B","8":"0x04AF","*":"0x04AE","9":"0x04B1","(":"0x04B0",
"0":"0x049B",")":"0x049A","-":"0x04E9","_":"0x04E8","=":"0x04BB","+":"0x04BA"}

	function Insert(obj, str){
		if(document.selection){
			var oSel = document.selection.createRange();
			oSel.text = str;
		}else{
			var currPos = obj.selectionStart;
			var objValue=obj.value;
			obj.value = objValue.substring(0,currPos)+str+objValue.substring(currPos);
			obj.selectionStart = obj.selectionEnd =currPos+1;
		}
	}
	
	function En2Kz(enChar){
		if(wLanguage == "arb")
			return keyArbMap[enChar]?String.fromCharCode(keyArbMap[enChar]):enChar;
		else
			return keyCyrlMap[enChar]?String.fromCharCode(keyCyrlMap[enChar]):enChar;
	}
	
	function AddKzChar(e){
		var oEvent = e?e:window.event;
		var oKey = oEvent.keyCode?oEvent.keyCode:oEvent.which;
		var oSrc = oEvent.srcElement?oEvent.srcElement:oEvent.target;
		var oValue = String.fromCharCode(oKey);
		
		if(wLanguage == "arb" && keyArbMap[oValue]&&wKz || wLanguage == "cyrl" && keyCyrlMap[oValue]&&wKz){
			
			if(window.event) window.event.returnValue = false;
			if(window.event) window.event.cancelBubble =true;
			if(oEvent.preventDefault) oEvent.preventDefault();
			if(oEvent.stopPropagation) oEvent.stopPropagation();
			Insert(oSrc,En2Kz(oValue));
		}
	}
	
	function HotKey(e){
		var oEvent = e?e:window.event;
		var oKey = oEvent.keyCode?oEvent.keyCode:oEvent.which;
		if(oKey == 75 && oEvent.ctrlKey && oEvent.altKey ){
			wKz = !wKz;
		}
	}
	
	function AddEvent(obj, evn, fun){
		if(obj.tagName&&!(obj.tagName == "TEXTAREA" ||
		(obj.tagName == "INPUT" && obj.type == "text")))
				return ;
		  if(document.all){
		   	obj.attachEvent('on'+evn, fun);
		   }else{
		   	obj.addEventListener(evn, fun, false);
		   }	
	}
	
	function RemoveEvent(obj, evn, fun){
		if(obj.tagName&&!(obj.tagName == "TEXTAREA" ||
		(obj.tagName == "INPUT" && obj.type == "text")))
				return ;
		  if(document.all){
		   	obj.detachEvent('on'+evn, fun);
		   }else{
		   	obj.removeEventListener(evn, fun, false);
		   }	
	}
	
	
	function BindFuncForObjs(objs){
		for(var i=0 ; i< objs.length ;i++){
					AddEvent(objs[i], "keydown", HotKey);
					AddEvent(objs[i], "keypress", AddKzChar);
			}
	}
	
	window.onload = function(){
		if(wAll){
			var allTextarea = document.getElementsByTagName("textarea");
			BindFuncForObjs(allTextarea);       // write all textarea
			var allInput = document.getElementsByTagName("input");
			BindFuncForObjs(allInput);     // write all input or type = text
			
			if(nIds != ""){     // remove these ids Event
				var nIdsArr = nIds.split(":");
				for(var i=0 ; i<nIdsArr.length;i++){
					RemoveEvent(document.getElementById(nIdsArr[i]),"keydown",HotKey);
					RemoveEvent(document.getElementById(nIdsArr[i]),"keypress",AddKzChar);
				}
			}
			
			if(nNames != ""){
				var nNamesArrs = nNames.split(":");
				for(var i=0;i<nNamesArrs.length;i++){
					var nNamesArr =document.getElementsByName(nNamesArrs[i]);
					for(var j=0; j<nNamesArr.length;j++){
						RemoveEvent(nNamesArr[j],"keydown", HotKey);
						RemoveEvent(nNamesArr[j],"keypress", AddKzChar);
					}
				}
			}
		}else{
			if(wIds != ""){    // these Ids write kazakh words
				var wIdsArr = wIds.split(":");
				for(var i=0; i< wIdsArr.length; i++){
					AddEvent(document.getElementById(wIdsArr[i]),"keydown",HotKey);
					AddEvent(document.getElementById(wIdsArr[i]),"keypress",AddKzChar);
				}
			}
			
			if(wNames != ""){
				var wNamesArrs = wNames.split(":");
				for(var i=0; i<wNamesArrs.length; i++){
					var wNamesArr =document.getElementsByName(wNamesArrs[i]);
					BindFuncForObjs(wNamesArr);
				}
			}
		}
	}
