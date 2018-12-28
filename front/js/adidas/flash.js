function openflash(width,height,src,pm)
{
    return "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width="+width+" height="+height+">
    <param name=movie value="+src+"><param name=\"flashvars\" value=\"pm="+pm+"\"><param name=\"allowScriptAccess\" value=\"sameDomain\"><param name=\"wmode\" value=\"transparent\">
    <param name=quality value=high ><embed src="+src+" quality=high  pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width="+width+" height="+height+">
    </embed>
    </object>";
}