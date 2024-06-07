<div align="center">

## [BLOB 바로가기](https://blob-omega.vercel.app/) 

<div>
 <img src="https://github.com/PROJECT-BLOB/front-end/assets/72595163/cbc23d23-a078-46d8-bdaf-f723001c570f" alt="별 하나에 글 하나 로고">
</div>

<h3> "BLOB으로 지도에 정보를 공유해보세요" </h3>

여행 정보 공유 SNS

<br />

지도에는 사용자들이 작성한 글을 마커를 통해 보여줍니다

현지 상황의 정보를 사용자들게 공유해보세요

</br>


[🔗 notion 바로가기](https://www.notion.so/Sprint-Part4-Team4-b7b1ab535d0e4907bd730d132c5a3199)

</div>


<br />

# 프로젝트 소개

## BLOB 만들게 된 계기

혹시 여행 중 오래된 정보나 부정확한 정보로 인해 불편함을 겪은 적이 한번쯤 있지 않으신가요? 

또한 교통상황, 사건 사고 등 여행 중 실시간으로 업데이트되는 정보들을 모아볼 수 있는 곳이 없어서,

날씨 이슈로 행사가 취소된다든가, 시시각각 바뀌는 현지 상황을 알지 못해 여행 중 예기치 못한 일들을 겪게 되기도 합니다.

저희는 이러한 불편함을 해결하기 위해 블롭이라는 서비스를 생각하게 되었습니다.

<br />

## 주요 기능 설명

### 🗺️ 지도 페이지
- 마커는 클러스터링으로 구현되어 줌 아웃을 하면 여러개로 모아서 보여줍니다.
- 맵에서 보여지는 글들은 사이드바에서도 볼 수 있습니다.
- 모바일 화면에서는 사이드바 대신 바텀시트로 구현되어 있습니다
- 자동완성 검색창을 통해 지역과 나라를 검색하고 이동할 수 있습니다.
- 카테고리를 지정해 원하는 정보가 담긴 글만 필터링 해서 볼 수 있습니다.
- 글 작성 후, 24시간이 지나면 지도 페이지에서 글이 사라집니다.
- 좋아요를 받으면 남은 시간이 30분씩 연장됩니다.


### ✍️ 글 작성
- 검색을 통해 현재 보고있는 위치가 아닌, 다른 나라에도 설정할 수 있습니다
- 미니맵으로 자세한 위치를 설정할 수 있습니다.
- 사진은 5장까지 첨부할 수 있습니다.

### 🪧 피드 페이지
- 모든 글을 조회 할 수 있습니다.
- 필터링으로 기간도 설정할 수 있고, 이미지가 있는 글, 상세위치가 있는 글까지 모아볼 수 있습니다.

### 🗂 마이 페이지
- 프로필 정보를 다른사람이 보지 못하도록 비공개 설정을 할 수 있습니다.
- 해당 유저가 작성한 글, 저장한글, 댓글 단 글을 모아볼 수 있습니다.
- 내가 작성한 글, 북마크한 글, 댓글 단 글을 모아볼 수 있습니다

### 🛎️ 알림

- 누군가 내 글에 좋아요를 남기거나, 댓글을 달게 되면 알림창에 알림이 뜨게 됩니다.


<br />

# 기술 스택

<img width="733" alt="스크린샷 2024-05-22 오후 10 07 29" src="https://github.com/PROJECT-BLOB/front-end/assets/72595163/417a364b-f4ab-487c-8a85-7c222a43d2e4">

<br />

## 🗂 문서
- [API](http://ec2-13-124-35-140.ap-northeast-2.compute.amazonaws.com:9000/swagger-ui/index.html)
- [프로토타입](https://www.figma.com/design/o4rna1cWakkNvmEke4Cgko/BLOB_DESIGN_SYSTEM?node-id=6-3611&m=dev)


## 팀원
<table>
    <tr>
        <td align="center"><img src="https://github.com/Dev-Duke-Seo.png" width="80"></td>
        <td align="center"><img src="https://github.com/INKmin9.png" width="80"></td>
        <td align="center"><img src="https://github.com/haeyong9701.png" width="80"></td>
        <td align="center"><img src="https://github.com/yejiniee.png" width="80"></td>
        <td align="center"><img src="https://github.com/chlangus.png" width="80"></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Dev-Duke-Seo">서인덕</a></td>
        <td align="center"><a href="https://github.com/INKmin9">김민교</a></td>
        <td align="center"><a href="https://github.com/haeyong9701">윤해용</a></td>
        <td align="center"><a href="https://github.com/yejiniee">조예진</a></td>
        <td align="center"><a href="https://github.com/chlangus">최무현</a></td>
    </tr>
      <tr>
        <td align="center">팀장, FE</td>
        <td align="center">FE</td>
        <td align="center">FE</td>
        <td align="center">FE</td>
        <td align="center">FE</td>
    </tr>
</table>

<table>
    <tr>
        <td align="center"><img src="https://github.com/mawakeb.png" width="80"></td>
        <td align="center"><img src="https://github.com/dodudi.png" width="80"></td>
        <td align="center">
          <img width="80" alt="스크린샷 2024-05-22 오후 10 32 29" src="https://github.com/PROJECT-BLOB/front-end/assets/72595163/a8622f1f-1250-4245-a9d5-84f5019702a1">
        </td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/mawakeb">김채린</a></td>
        <td align="center"><a href="https://github.com/dodudi">권덕영</a></td>
        <td align="center"><a href="https://vsongyev.myportfolio.com/">박송이</a></td>
    </tr>
      <tr>
        <td align="center">BE</td>
        <td align="center">BE</td>
        <td align="center">DE</td>
    </tr>
</table>
