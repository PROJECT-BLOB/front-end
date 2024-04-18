# 코드는 최대한 잘게 쪼개서 작성한다.
  ## 이게 맞나? 싶을정도로 ㅋㅋ

# Collocation
1. 재사용이 없(적)는 코드는 해당 코드를 필요로하는 곳에 가까이둔다.(가장 가까운 위치 = 같은 파일)
2. 재사용이 필요한 코드는 해당 코드를 필요로 하는 것들의 공통 조상(위치)를 찾아 그곳에 둔다.
3. 단 그 위치가 app폴더일 경우 app폴더 바깥의 별도 폴더에 둔다.
> ex) props 타입의 경우 기본적으로 해당 파일에 같이 위치하나, 공통으로 사용되는 경우 별도파일로 분리한 뒤 해당하는 위치를 찾는다. 


# Naming
## 줄임말 사용금지.
> res, info, arr, obj, tmp
-> ex) result, information, array, object, temporary

## 함수/변수
1. 파일명 : 명사
2. 함수명 : 동사 + 명사
   * 이때 동사는 가급적 구체적 행위를 명시한다.
> ex) do, some등의 포괄적인 동사,명사를 사용하지 않는다. (모르면 gpt 센세에게...)
> ex) 1. handleClick (권장) / 2. onClick / 3. clickHandle /4. clickHandler
   * 명사에 숫자를 사용하지 않는다. (숫자명사도 불가)
> ex) list1, list2

3. 함수를 파일명으로 사용할 경우, 명사 폴더로 감싼다.
>> livemap > _utils > randomColorUtil > generateRandomColor.ts / convertToRgbNumber.ts

4. 화살표/function
   함수 선언식: function 함수명 () {}
   * this 바인딩과 관련된 이슈가 있는경우 화살표 함수 사용.
   
5. dataFetch
   * CRUD : Create, Get, Update, Delete + fetchTarget
   * 메서드별로 파일을 분리하고 관련된 api를 폴더에 모아둔다.
   * 해당 파일에 관련된 type을 정의한다.
> ex) getUser, postUserList

# type
1. 기본적으로 객체는 interface, 단순 변수는 type으로 선언한다. (PascalCase)  
```typescript
interface User {
   name: string;
   age: number;
   nickName: UserNickName;
}
type UserNickName = string || null;

```
2. interface:
 * 컴포넌트 props 일경우에는, +Props 로 명명. // 컴포넌트 위에 위치
 * 컴포넌트에 props가 없을 경우에는? -> 안쓴다.
 * children이 있는 경우에는 PropsWithChildren 타입 활용
 * props가 한개 또는 단순해도 별도 타입(인터페이스)을 정의합니다.

```typescript
// props에 children이 포함된 경우
import {PropsWithChildren} from "react";

type ColumnContainerProps = PropsWithChildren<{ isLastColumn?: boolean; }>;

const ColumnContainer = ({children, isLastColumn = false}: ColumnContainerProps) => {
  return <S.Container $isLastColumn = {isLastColumn} > {children} < /S.Container>;
}
//props에 children만 있는 경우
   const ColumnContainer = ({children}: PropsWithChildren) => {
      return <S.Container>{children} < /S.Container>;
   };
   
//props가 1개일 경우  (don't)
   const tileClassName = ({ date }: { date: Date }): string | null => {
     if (date.getDay() === 0) {
       return "holiday"; // 일요일일 경우 'sunday' 클래스 추가
     }
   }
```


////

#css
- 1rem = 10px.
- media break point는 ___/______/_____ 기준으로 작성한다. (디자이너 확인 예정)
