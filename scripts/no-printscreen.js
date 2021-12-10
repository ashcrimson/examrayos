<!--
/**************************************************
* (c) ArtistScope (www.artistscope.com)
**************************************************/

function do_err()
    {
        return true
    }
onerror=do_err;

function no_cp()
    {
        clipboardData.clearData();setTimeout("no_cp()",100)
    }
no_cp();

//-->
