<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="common.util.SessionUtil"%>
<%@page import="common.util.Constant"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">	


function inChange(){
if("<%= request.getParameter("GUBN") %>" == "1"){
	document.getElementById("li1").className="on";
}else if ("<%= request.getParameter("GUBN") %>" == "2"){
	document.getElementById("li2").className="on";
}else {
	document.getElementById("li3").className="on";
}
}

//공지사항 상세
function fn_NoticeView(annoId,flag) {
	if(flag == "us") {
		location.href="/PF080202.action?command=<%= Constant.CMD_VIEW%>&flag=us&ANNOID="+annoId;
	}else {
		location.href="/PF080202.action?command=<%= Constant.CMD_VIEW%>&ANNOID="+annoId;	
	}
}

</script>
<!-- snb -->
			<form id="frmLeft" name="frmLeft" method="post">			
				<!-- <input type = "hidden" id="S_COMMAND" name="command" />-->		
				<input type = "hidden" id="ANNOID" name="ANNOID" />
				<input type = "hidden" id="flag" name="flag"  />
				<div id="snb">	
					<!-- leftmenu -->
					<dl class="club">
						<dt><img src="/images/adidas/club/leftmenu_01.gif" alt="아디클럽" /></dt>
						<dd>
							<ul>
								<li id="li1"><a href="/PF080101.action?GUBN=1">클럽 소개</a></li>
								<li id="li2"><a href="/PF080101.action?GUBN=2">회원 혜택</a></li>
								<li id="li3"><a href="/PF080101.action?GUBN=3">회원가입방법</a></li>
							</ul>
						</dd>
						<dt><a href="/PF070201.action"><img src="/images/adidas/club/leftmenu_02.gif" alt="캠페인" /></a></dt>
						<dt><a href="/PF080102.action"><img src="/images/adidas/club/leftmenu_03.gif" alt="웹진" /></a></dt>
						<dt class="last"><a href="/PF080201.action"><img src="./images/adidas/club/leftmenu_04.gif" alt="공지사항" /></a></dt>
					</dl>
					<!-- //leftmenu -->

					<!-- notice -->
					<div class="notice">
						<dl>
							<dt><img src="/images/adidas/club/leftmenu_notice.gif" alt="공지사항" class="tit" /><a href="/PF080201.action"><img src="./images/adidas/club/btn_more.gif" alt="더보기" class="more" /></a></dt>
							<c:choose>
								<c:when test="${map.notice.size > 0}">
									<c:forEach var="list" items="${map.notice.list}" begin="0" end="1" varStatus="num">
										<c:choose>
											<c:when test="${num.count != map.notice.size}">
												<dd><p><a href="javascript:fn_NoticeView('${list.ANNO_MTTR_ID}');">												
												<c:choose>
													<c:when test="${fn:length(list.ANNO_TITLE) > 13}">
														<c:out value="${fn:substring(list.ANNO_TITLE,0,13)}"/><br>
														<c:out value="${fn:substring(list.ANNO_TITLE,13,fn:length(list.ANNO_TITLE))}"/>
													</c:when>
													<c:otherwise><c:out value="${list.ANNO_TITLE}"/></c:otherwise>
												</c:choose>
												</a></p></dd>										
											</c:when>
											<c:otherwise>
												<dd class="last"><p><a href="javascript:fn_NoticeView('${list.ANNO_MTTR_ID}');">
												<c:choose>
													<c:when test="${fn:length(list.ANNO_TITLE) > 13}">
														<c:out value="${fn:substring(list.ANNO_TITLE,0,13)}"/><br>
														<c:out value="${fn:substring(list.ANNO_TITLE,13,fn:length(list.ANNO_TITLE))}"/>
													</c:when>
													<c:otherwise><c:out value="${list.ANNO_TITLE}"/></c:otherwise>
												</c:choose>
												</a></p></dd>
											</c:otherwise>
										</c:choose>
									</c:forEach>
								</c:when>
								<c:otherwise>
									공지사항 리스트가 없습니다.
								</c:otherwise>
							</c:choose>	
							<!-- <dd><p><a href="#">[당첨자 안내] <br />adidas Outdoor <br />3 in 1 자켓 출시 기념 이벤트</a></p></dd>
							<dd class="last"><p><a href="#">[안내] <br />Autumn 2010 오리지널의 <br />신제품을 만나보세요</a></p></dd>-->
						</dl>
					</div>
					<!-- //notice -->
				</div>
				<!-- //snb -->
			</form>