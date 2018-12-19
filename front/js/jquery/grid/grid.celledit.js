;(function($){
/*
**
 * jqGrid extension for cellediting Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/ 
/**
 * all events and options here are aded anonynous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for noneditable cels)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (ajax))
 * afterSubmitCell(if cellsubmit remote (ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit (remote,clientArray) (added in grid options)
 * cellurl
 * ajaxCellOptions
* */
$.jgrid.extend({
	editCell : function (iRow,iCol, ed){
		return this.each(function (){
			var $t = this, nm, tmp,cc;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			iCol = parseInt(iCol,10);
			// select the row that can be used for other methods
			$t.p.selrow = $t.rows[iRow].id;
			/**
			 * 2010-04-12 김중태
			 * 에디트모드로 변경시 테이블 컬럼명 상단에 공간이 생기는 것을 방지하기 위한 주석처리
			 */
			//if (!$t.p.knv) {$($t).jqGrid("GridNav");}
			// check to see if we have already edited cell
			if ($t.p.savedRow.length>0) {
				// prevent second click on that field and enable selects
				if (ed===true ) {
					if(iRow == $t.p.iRow && iCol == $t.p.iCol){
						return;
					}
				}
				// save the cell
				$($t).jqGrid("saveCell",$t.p.savedRow[0].id,$t.p.savedRow[0].ic);
			} else {
				window.setTimeout(function () { $("#"+$t.p.knv).attr("tabindex","-1").focus();},0);
			}
			nm = $t.p.colModel[iCol].name;
			if (nm=='subgrid' || nm=='cb' || nm=='rn') {return;}
			cc = $("td:eq("+iCol+")",$t.rows[iRow]);
			if ($t.p.colModel[iCol].editable===true && ed===true && !cc.hasClass("not-editable-cell")) {
				if(parseInt($t.p.iCol)>=0  && parseInt($t.p.iRow)>=0) {
					/**2010-04-06 김중태
					 * 선택한 셀 배경색이 변경되는것을 막기 위한 주석처리
					 */
//					$("td:eq("+$t.p.iCol+")",$t.rows[$t.p.iRow]).removeClass("edit-cell ui-state-highlight");
//					$($t.rows[$t.p.iRow]).removeClass("selected-row ui-state-hover");
				}
				/**2010-04-06 김중태
				 * 선택한 셀 배경색이 변경되는것을 막기 위한 주석처리
				 */
//				$(cc).addClass("edit-cell ui-state-highlight");
//				$($t.rows[iRow]).addClass("selected-row ui-state-hover");
				try {
					tmp =  $.unformat(cc,{rowId: $t.rows[iRow].id, colModel:$t.p.colModel[iCol]},iCol);
				} catch (_) {
					tmp = $(cc).html();
				}
				if($t.p.autoencode) tmp = $.jgrid.htmlDecode(tmp);
				if (!$t.p.colModel[iCol].edittype) {$t.p.colModel[iCol].edittype = "text";}
				$t.p.savedRow.push({id:iRow,ic:iCol,name:nm,v:tmp});
				if($.isFunction($t.p.formatCell)) {
					var tmp2 = $t.p.formatCell($t.rows[iRow].id,nm,tmp,iRow,iCol);
					if(tmp2 != undefined ) {tmp = tmp2;}
				}
				var opt = $.extend({}, $t.p.colModel[iCol].editoptions || {} ,{id:iRow+"_"+nm,name:nm});
				var elc = createEl($t.p.colModel[iCol].edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions || {}));
				if ($.isFunction($t.p.beforeEditCell)) {
					$t.p.beforeEditCell($t.rows[iRow].id,nm,tmp,iRow,iCol);
				}
				$(cc).html("").append(elc).attr("tabindex","0");
				window.setTimeout(function () { $(elc).focus();},0);
				$("input, select, textarea",cc).bind("keydown",function(e) {
					/**
					 * 2010-04-08 김중태
					 * if문보다 switch ~ case 문이 프로세스 흐름상 더 효율적이므로 수정함
					 */
//					if (e.keyCode === 27) {
//						if($("input.hasDatepicker",cc).length >0) {
//							if( $(".ui-datepicker").is(":hidden") )  $($t).jqGrid("restoreCell",iRow,iCol);
//							else $("input.hasDatepicker",cc).datepicker('hide');
//						}
//						else 
//							$($t).jqGrid("restoreCell",iRow,iCol);
//					} //ESC
//					if (e.keyCode === 13) {
//						/**
//						 * 2010-04-08 김중태
//						 * 엔터키나 텝키를 클릭하여 저장할 경우 validation 체크를 위한 함수 추가
//						 */
//						if ($.isFunction($t.p.beforeKeyEvent)) {
//							var vv = $t.p.beforeKeyEvent($t.rows[iRow].id,nm,tmp,iRow,iCol);
//							if (!vv) {return false;}
//						}
//						$($t).jqGrid("saveCell",iRow,iCol);
//					}//Enter
//					if (e.keyCode == 9)  {
//						/**
//						 * 2010-04-08 김중태
//						 * 엔터키나 텝키를 클릭하여 저장할 경우 validation 체크를 위한 함수 추가
//						 */
//						if ($.isFunction($t.p.beforeKeyEvent)) {
//							var vv = $t.p.beforeKeyEvent($t.rows[iRow].id,nm,tmp,iRow,iCol);
//							if (!vv) {return false;}
//						}
//						if(!$t.grid.hDiv.loading ) {
//							if (e.shiftKey) {$($t).jqGrid("prevCell",iRow,iCol);} //Shift TAb
//							else {$($t).jqGrid("nextCell",iRow,iCol);} //Tab
//						} else {
//							return false;
//						}
//					}
					switch(e.keyCode) {
						case 27 : 
							if($("input.hasDatepicker",cc).length >0) {
								if( $(".ui-datepicker").is(":hidden") )  $($t).jqGrid("restoreCell",iRow,iCol);
								else $("input.hasDatepicker",cc).datepicker('hide');
							}
							else 
								$($t).jqGrid("restoreCell",iRow,iCol);
							break;
						case 13 : 
							/**
							 * 2010-04-08 김중태
							 * 엔터키나 텝키를 클릭하여 저장할 경우 validation 체크를 위한 함수 추가
							 */
							if ($.isFunction($t.p.beforeKeyEvent)) {
								var vv = $t.p.beforeKeyEvent($t.rows[iRow].id,nm,tmp,iRow,iCol);
								if (!vv) {return false;}
							}
							$($t).jqGrid("saveCell",iRow,iCol);
							break;
						case 9 : 
							/**
							 * 2010-04-08 김중태
							 * 엔터키나 텝키를 클릭하여 저장할 경우 validation 체크를 위한 함수 추가
							 */
							if ($.isFunction($t.p.beforeKeyEvent)) {
								var result = $t.p.beforeKeyEvent($t.rows[iRow].id,nm,tmp,iRow,iCol);
								if (!result) {return false;}
							}
							if(!$t.grid.hDiv.loading ) {
								if (e.shiftKey) {$($t).jqGrid("prevCell",iRow,iCol);} //Shift TAb
								else {$($t).jqGrid("nextCell",iRow,iCol);} //Tab
							} else {
								return false;
							}
							/**
							 * 2010-04-08 김중태
							 * 엔터키나 텝키를 클릭하여 저장할 경우 validation 체크를 위한 함수 추가
							 */
							if ($.isFunction($t.p.editOtherRow)) {
								$t.p.editOtherRow($t.rows[iRow].id,nm,tmp,iRow,iCol);
							}
					}
					e.stopPropagation();
				});
				
				$("input, select, textarea",cc).bind("focusout",function() {
					$($t).jqGrid("saveCell",iRow,iCol);
				});
				
				if ($.isFunction($t.p.afterEditCell)) {
					$t.p.afterEditCell($t.rows[iRow].id,nm,tmp,iRow,iCol);
				}
				/**
				 * 2010-04-08 김중태
				 * 텍스트박스 에디트모드로 변경되면서 텍스트를 선택된 상태로 만들기 위한 코드추가
				 */
				if($t.p.colModel[iCol].edittype == "text") {
					try{
						document.getElementById(iRow + "_" + nm).focus();
						document.getElementById(iRow + "_" + nm).select();
					} catch (e) {}
				}
			} else {
				if (parseInt($t.p.iCol)>=0  && parseInt($t.p.iRow)>=0) {
					/**2010-04-06 김중태
					 * 선택한 셀 배경색이 변경되는것을 막기 위한 주석처리
					 */
//					$("td:eq("+$t.p.iCol+")",$t.rows[$t.p.iRow]).removeClass("edit-cell ui-state-highlight");
//					$($t.rows[$t.p.iRow]).removeClass("selected-row ui-state-hover");
				}
				/**2010-04-06 김중태
				 * 선택한 셀 배경색이 변경되는것을 막기 위한 주석처리
				 */
//				cc.addClass("edit-cell ui-state-highlight");
//				$($t.rows[iRow]).addClass("selected-row ui-state-hover"); 
				if ($.isFunction($t.p.onSelectCell)) {
					tmp = cc.html().replace(/\&#160\;/ig,'');
					$t.p.onSelectCell($t.rows[iRow].id,nm,tmp,iRow,iCol);
				}
			}
			$t.p.iCol = iCol; $t.p.iRow = iRow;
		});
	},
	saveCell : function (iRow, iCol){
		return this.each(function(){
			var $t= this, fr;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			if ( $t.p.savedRow.length >= 1) {fr = 0;} else {fr=null;} 
			if(fr != null) {
				var cc = $("td:eq("+iCol+")",$t.rows[iRow]),v,v2,
				cm = $t.p.colModel[iCol], nm = cm.name, nmjq = $.jgrid.jqID(nm) ;
				switch (cm.edittype) {
					case "select":
						if(!cm.editoptions.multiple) {
							v = $("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).val();
							v2 = $("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).text();
						} else {
							var sel = $("#"+iRow+"_"+nmjq,$t.rows[iRow]), selectedText = [];
							v = $(sel).val();
							if(v) v.join(","); else v="";
							$("option:selected",sel).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
							v2 = selectedText.join(",");
						}
						if(cm.formatter) v2 = v;
						break;
					case "checkbox":
						var cbv  = ["Yes","No"];
						if(cm.editoptions){
							cbv = cm.editoptions.value.split(":");
						}
						v = $("#"+iRow+"_"+nmjq,$t.rows[iRow]).attr("checked") ? cbv[0] : cbv[1];
						v2=v;
						break;
					case "password":
					case "text":
					case "textarea":
					case "button" :
						v = $("#"+iRow+"_"+nmjq,$t.rows[iRow]).val();
						v2=v;
						break;
					case 'custom' :
						try {
							if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
								v = cm.editoptions.custom_value($(".customelement",cc),'get');
								if (v===undefined) throw "e2"; else v2=v;
							} else throw "e1";
						} catch (e) {
							if (e=="e1") info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,jQuery.jgrid.edit.bClose);
							if (e=="e2") info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,jQuery.jgrid.edit.bClose);
							else info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose);
						}
						break;
				}
				// The common approach is if nothing changed do not do anything
				if (v2 != $t.p.savedRow[fr].v){
					if ($.isFunction($t.p.beforeSaveCell)) {
						var vv = $t.p.beforeSaveCell($t.rows[iRow].id,nm, v, iRow,iCol);
						if (vv) {v = vv;}
					}
					var cv = checkValues(v,iCol,$t);
					if(cv[0] === true) {
						var addpost = {};
						if ($.isFunction($t.p.beforeSubmitCell)) {
							addpost = $t.p.beforeSubmitCell($t.rows[iRow].id,nm, v, iRow,iCol);
							if (!addpost) {addpost={};}
						}
						if(v2=="") v2=" ";
						if( $("input.hasDatepicker",cc).length >0) $("input.hasDatepicker",cc).datepicker('hide');
						if ($t.p.cellsubmit == 'remote') {
							if ($t.p.cellurl) {
								var postdata = {};
								if($t.p.autoencode) v = $.jgrid.htmlEncode(v);
								postdata[nm] = v;
								var idname,oper, opers;
								opers = $t.p.prmNames;
								idname = opers.id;
								oper = opers.oper;
								postdata[idname] = $t.rows[iRow].id;
								postdata[oper] = opers.editoper;
								postdata = $.extend(addpost,postdata);
								$("#lui_"+$t.p.id).show();
								$t.grid.hDiv.loading = true;
								$.ajax( $.extend( {
									url: $t.p.cellurl,
									data :$.isFunction($t.p.serializeCellData) ? $t.p.serializeCellData(postdata) : postdata,
									type: "POST",
									complete: function (result, stat) {
										$("#lui_"+$t.p.id).hide();
										$t.grid.hDiv.loading = false;
										if (stat == 'success') {
											if ($.isFunction($t.p.afterSubmitCell)) {
												var ret = $t.p.afterSubmitCell(result,postdata.id,nm,v,iRow,iCol);
												if(ret[0] === true) {
													$(cc).empty();
													$($t).jqGrid("setCell",$t.rows[iRow].id, iCol, v2);
													$(cc).addClass("dirty-cell");
													$($t.rows[iRow]).addClass("edited");
													if ($.isFunction($t.p.afterSaveCell)) {
														$t.p.afterSaveCell($t.rows[iRow].id,nm, v, iRow,iCol);
													}
													$t.p.savedRow.splice(0,1);
												} else {
													info_dialog($.jgrid.errors.errcap,ret[1],$.jgrid.edit.bClose);
													$($t).jqGrid("restoreCell",iRow,iCol);
												}
											} else {
												$(cc).empty();
												$($t).jqGrid("setCell",$t.rows[iRow].id, iCol, v2);
												$(cc).addClass("dirty-cell");
												$($t.rows[iRow]).addClass("edited");
												if ($.isFunction($t.p.afterSaveCell)) {
													$t.p.afterSaveCell($t.rows[iRow].id,nm, v, iRow,iCol);
												}
												$t.p.savedRow.splice(0,1);
											}
										}
									},
									error:function(res,stat) {
										$("#lui_"+$t.p.id).hide();
										$t.grid.hDiv.loading = false;
										if ($.isFunction($t.p.errorCell)) {
											$t.p.errorCell(res,stat);
											$($t).jqGrid("restoreCell",iRow,iCol);
										} else {
											info_dialog($.jgrid.errors.errcap,res.status+" : "+res.statusText+"<br/>"+stat,$.jgrid.edit.bClose);
											$($t).jqGrid("restoreCell",iRow,iCol);
										}
									}
								}, $.jgrid.ajaxOptions, $t.p.ajaxCellOptions || {}));
							} else {
								try {
									info_dialog($.jgrid.errors.errcap,$.jgrid.errors.nourl,$.jgrid.edit.bClose);
									$($t).jqGrid("restoreCell",iRow,iCol);
								} catch (e) {}
							}
						}
						if ($t.p.cellsubmit == 'clientArray') {
							$(cc).empty();
							$($t).jqGrid("setCell",$t.rows[iRow].id,iCol, v2);
							$(cc).addClass("dirty-cell");
							$($t.rows[iRow]).addClass("edited");
							if ($.isFunction($t.p.afterSaveCell)) {
								$t.p.afterSaveCell($t.rows[iRow].id,nm, v, iRow,iCol);
							}
							$t.p.savedRow.splice(0,1);
						}
					} else {
						try {
							window.setTimeout(function(){info_dialog($.jgrid.errors.errcap,v+" "+cv[1],$.jgrid.edit.bClose);},100);
							$($t).jqGrid("restoreCell",iRow,iCol);
						} catch (e) {}
					}
				} else {
					$($t).jqGrid("restoreCell",iRow,iCol);
				}
			}
			if ($.browser.opera) {
				$("#"+$t.p.knv).attr("tabindex","-1").focus();
			} else {
				window.setTimeout(function () { $("#"+$t.p.knv).attr("tabindex","-1").focus();},0);
			}
		});
	},
	restoreCell : function(iRow, iCol) {
		return this.each(function(){
			var $t= this, fr;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			if ( $t.p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
			if(fr != null) {

				/**2010-04-07 김중태
				 * 탭을 누를 경우 다음 셀의 저장을 위한 전역변수값 셋팅함수 호출
				 */
//				var cc = $("td:eq("+iCol+")",$t.rows[iRow]);
				var cc = $("td:eq("+iCol+")",$t.rows[iRow]),v,v2,
				cm = $t.p.colModel[iCol], nm = cm.name, nmjq = $.jgrid.jqID(nm) ;
				switch (cm.edittype) {
					case "select":
						if(!cm.editoptions.multiple) {
							v = $("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).val();
							v2 = $("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).text();
						} else {
							var sel = $("#"+iRow+"_"+nmjq,$t.rows[iRow]), selectedText = [];
							v = $(sel).val();
							if(v) v.join(","); else v="";
							$("option:selected",sel).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
							v2 = selectedText.join(",");
						}
						if(cm.formatter) v2 = v;
						break;
					case "checkbox":
						var cbv  = ["Yes","No"];
						if(cm.editoptions){
							cbv = cm.editoptions.value.split(":");
						}
						v = $("#"+iRow+"_"+nmjq,$t.rows[iRow]).attr("checked") ? cbv[0] : cbv[1];
						v2=v;
						break;
					case "password":
					case "text":
					case "textarea":
					case "button" :
						v = $("#"+iRow+"_"+nmjq,$t.rows[iRow]).val();
						v2=v;
						break;
					case 'custom' :
						try {
							if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
								v = cm.editoptions.custom_value($(".customelement",cc),'get');
								if (v===undefined) throw "e2"; else v2=v;
							} else throw "e1";
						} catch (e) {
							if (e=="e1") info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,jQuery.jgrid.edit.bClose);
							if (e=="e2") info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,jQuery.jgrid.edit.bClose);
							else info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose);
						}
						break;
				}
				/**
				 * 여기까지가 "탭을 누를 경우 다음 셀의 저장을 위한 전역변수값 셋팅함수 호출" 을 위해 추가된 부분
				 */
				
				// datepicker fix
				if($.isFunction($.fn['datepicker'])) {
					try {
						$("input.hasDatepicker",cc).datepicker('hide');
					} catch (e) {}
				}
				$(cc).empty().attr("tabindex","-1");
				$($t).jqGrid("setCell",$t.rows[iRow].id, iCol, $t.p.savedRow[fr].v);
				$t.p.savedRow.splice(0,1);
				
			}
			/**2010-04-07 김중태
			 * 탭을 누를 경우 다음 셀의 저장을 위한 전역변수값 셋팅함수 호출
			 */
			if ($.isFunction($t.p.afterRestoreCell)) {
				$t.p.afterRestoreCell($t.rows[iRow].id,nm, v, iRow,iCol);
			}
			window.setTimeout(function () { $("#"+$t.p.knv).attr("tabindex","-1").focus();},0);
		});
	},
	nextCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, nCol=false;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			// try to find next editable cell
			for (var i=iCol+1; i<$t.p.colModel.length; i++) {
				if ( $t.p.colModel[i].editable ===true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$($t).jqGrid("editCell",iRow,nCol,true);
			} else {
				if ($t.p.savedRow.length >0) {
					$($t).jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	prevCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, nCol=false;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			// try to find next editable cell
			for (var i=iCol-1; i>=0; i--) {
				if ( $t.p.colModel[i].editable ===true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$($t).jqGrid("editCell",iRow,nCol,true);
			} else {
				if ($t.p.savedRow.length >0) {
					$($t).jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	GridNav : function() {
		return this.each(function () {
			var  $t = this;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			// trick to process keydown on non input elements
			$t.p.knv = $t.p.id + "_kn";
			var selection = $("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='"+$t.p.knv+"'></span></span>"),
			i, kdir;
			$(selection).insertBefore($t.grid.cDiv);
			$("#"+$t.p.knv)
			.focus()
			.keydown(function (e){
				kdir = e.keyCode;
				if($t.p.direction == "rtl") {
					if(kdir==37) kdir = 39;
					else if (kdir==39) kdir = 37;
				}
				switch (kdir) {
					case 38:
						if ($t.p.iRow-1 >=0 ) {
							scrollGrid($t.p.iRow-1,$t.p.iCol,'vu');
							$($t).jqGrid("editCell",$t.p.iRow-1,$t.p.iCol,false);
						}
					break;
					case 40 :
						if ($t.p.iRow+1 <=  $t.rows.length-1) {
							scrollGrid($t.p.iRow+1,$t.p.iCol,'vd');
							$($t).jqGrid("editCell",$t.p.iRow+1,$t.p.iCol,false);
						}
					break;
					case 37 :
						if ($t.p.iCol -1 >=  0) {
							i = findNextVisible($t.p.iCol-1,'lft');
							scrollGrid($t.p.iRow, i,'h');
							$($t).jqGrid("editCell",$t.p.iRow, i,false);
						}
					break;
					case 39 :
						if ($t.p.iCol +1 <=  $t.p.colModel.length-1) {
							i = findNextVisible($t.p.iCol+1,'rgt');
							scrollGrid($t.p.iRow,i,'h');
							$($t).jqGrid("editCell",$t.p.iRow,i,false);
						}
					break;
					case 13:
						if (parseInt($t.p.iCol,10)>=0 && parseInt($t.p.iRow,10)>=0) {
							$($t).jqGrid("editCell",$t.p.iRow,$t.p.iCol,true);
						}
					break;
				}
				return false;
			});
			function scrollGrid(iR, iC, tp){
				if (tp.substr(0,1)=='v') {
					var ch = $($t.grid.bDiv)[0].clientHeight,
					st = $($t.grid.bDiv)[0].scrollTop,
					nROT = $t.rows[iR].offsetTop+$t.rows[iR].clientHeight,
					pROT = $t.rows[iR].offsetTop;
					if(tp == 'vd') {
						if(nROT >= ch) {
							$($t.grid.bDiv)[0].scrollTop = $($t.grid.bDiv)[0].scrollTop + $t.rows[iR].clientHeight;
						}
					}
					if(tp == 'vu'){					
						if (pROT < st) {
							$($t.grid.bDiv)[0].scrollTop = $($t.grid.bDiv)[0].scrollTop - $t.rows[iR].clientHeight;
						}
					}
				}
				if(tp=='h') {
					var cw = $($t.grid.bDiv)[0].clientWidth,
					sl = $($t.grid.bDiv)[0].scrollLeft,
					nCOL = $t.rows[iR].cells[iC].offsetLeft+$t.rows[iR].cells[iC].clientWidth,
					pCOL = $t.rows[iR].cells[iC].offsetLeft;
					if(nCOL >= cw+parseInt(sl)) {
						$($t.grid.bDiv)[0].scrollLeft = $($t.grid.bDiv)[0].scrollLeft + $t.rows[iR].cells[iC].clientWidth;
					} else if (pCOL < sl) {
						$($t.grid.bDiv)[0].scrollLeft = $($t.grid.bDiv)[0].scrollLeft - $t.rows[iR].cells[iC].clientWidth;
					}
				}
			};
			function findNextVisible(iC,act){
				var ind, i;
				if(act == 'lft') {
					ind = iC+1;
					for (i=iC;i>=0;i--){
						if ($t.p.colModel[i].hidden !== true) {
							ind = i;
							break;
						}
					}
				}
				if(act == 'rgt') {
					ind = iC-1;
					for (i=iC; i<$t.p.colModel.length;i++){
						if ($t.p.colModel[i].hidden !== true) {
							ind = i;
							break;
						}						
					}
				}
				return ind;
			};
		});
	},
	getChangedCells : function (mthd) {
		var ret=[];
		if (!mthd) {mthd='all';}
		this.each(function(){
			var $t= this,nm;
			/**2010-04-06 김중태
			 * cellEdit 옵션을 체크하는 부분
			 * 쓰지 않을 것이므로 주석 처리 및 코드추가
			 */
//			if (!$t.grid || $t.p.cellEdit !== true) {return;}
			if (!$t.grid) {return;}
			$($t.rows).each(function(j){
				var res = {};
				if ($(this).hasClass("edited")) {
					$('td',this).each( function(i) {
						nm = $t.p.colModel[i].name;
						if ( nm !== 'cb' && nm !== 'subgrid') {
							if (mthd=='dirty') {
								if ($(this).hasClass('dirty-cell')) {
									try {
										res[nm] = $.unformat(this,{rowId:$t.rows[j].id, colModel:$t.p.colModel[i]},i);
									} catch (e){
										res[nm] = $.jgrid.htmlDecode($(this).html());
									}
								}
							} else {
								try {
									res[nm] = $.unformat(this,{rowId:$t.rows[j].id,colModel:$t.p.colModel[i]},i);
								} catch (e) {
									res[nm] = $.jgrid.htmlDecode($(this).html());
								}
							}
						}
					});
					res["id"] = this.id;
					ret.push(res);
				}
			});
		});
		return ret;
	}
/// end  cell editing
});
})(jQuery);
