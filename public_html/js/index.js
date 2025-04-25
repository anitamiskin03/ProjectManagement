/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var proDBName = "COLLEGE-DB";
var proRelationName = "PROJECT-TABLE";
var connToken = "90934736|-31949208770212797|90955903";


function resetForm() {
    $("#proId").val("");
    $("#proName").val("");
    $("#assignTo").val("");
    $("#assignDate").val("");
    $("#deadline").val("");
    $("#proId").prop(":disabled", false);
    $("#save").prop(":disabled", true);
    $("#change").prop(":disabled", true);
    $("#reset").prop(":disabled", true);
    $("#proId").focus();
}

function savedata() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, proDBName, proRelationName);
    
    $.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    $.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#proId").focus();
}

function validateAndGetFormData() {

    var proid = $("#proId").val();
    if (proid === "") {
        alert("Project ID is Misssing");
        $("#proId").focus();
        return "";
    }
    var proname = $("#proName").val();
    if (proname === "") {
        alert("Project Name is Misssing");
        $("#proName").focus();
        return "";
    }
    var assignto = $("#assignTo").val();
    if (assignto === "") {
        alert("Project Salary is Misssing");
        $("#assignTo").focus();
        return "";
    }
    var assigndate = $("#assignDate").val();
    if (assigndate === "") {
        alert("HRA  is Misssing");
        $("#assignDate").focus();
        return "";
    }
    
    var deadline = $("#deadline").val();
    if (deadline === "") {
        alert("Deduction is Misssing");
        $("#deadline").focus();
        return "";
    }
    var jsonStrObj = {
        Project_ID: proid,// Primary key
        Project_Name: proname,
        Assigned_To: assignto,
        Assignment_Date: assigndate,
        Deadline : deadline
    };
    return JSON.stringify(jsonStrObj);
}

function changedata() {
    $("#change").prop(":disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, proDBName, proRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#proId").focus();

}

function pgetProIdAsJsonObj() {
    var proid = $("#proId").val();
    var jsonStr = {
        Id: proid
    };
    return JSON.stringify(jsonStr);
}

function getPro() {
    var proIdJsonObj = pgetProIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, proDBName, proRelationName, proIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#proName").focus();
    } else if (resJsonObj.status === 200) {
        $("#proId").prop("disabled", true);
        fillData(resJsonObj);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#proName").focus();
    }
}
function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;

    $("#proName").val(record.Project_Name);
    $("#assignTo").val(record.Assigned_To);
    $("#assignDate").val(record.Assignment_Date);
    $("#deadline").val(record.Deeadline);


}







