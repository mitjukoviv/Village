	var result=[0,0,0,0,0,0,0];
	var total=[0,0,0,0,0,0,0];
	var dbRef = InitObj();
	var arr = GetResult();
	function InitObj(){
		var firebaseConfig = {
			apiKey: "AIzaSyCZWHB-T7MZSqeqT5Q6HETi-MMg9GEon5c",
			authDomain: "test-3dc2a.firebaseapp.com",
			databaseURL: "https://test-3dc2a.firebaseio.com",
			projectId: "test-3dc2a",
			storageBucket: "test-3dc2a.appspot.com",
			messagingSenderId: "65291994813",
			appId: "1:65291994813:web:df6862eaa58b5066c599d4",
			measurementId: "G-8L4J07EYC2"
		};
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
		var bigOne = document.getElementById('bigOne');
		var x = firebase.database().ref();
		return x;
	}
	function AddAnswer(x,y){
		dbRef.push ({
		   q: x,
		   a: y
		});
		total[x-1]+=1;
		result[x-1]+=y;
		ShowResult(x,result,total);
	}
	function GetResult(){
		dbRef.on("value", function(snapshot) {
			json = JSON.stringify(snapshot.val());
			arr = Object.values(JSON.parse(json));
			Calculate(arr);
		}, function (error) {
		   console.log("Error: " + error.code);
		});
		return arr;
	}
	function Calculate(arr){
		for(i=0;i<arr.length;i++){
			total[arr[i]['q']-1]++;
			result[arr[i]['q']-1]+=arr[i]['a'];
		}
	}
	function ShowResult(x,result,total){
		y=x-1;
		x='q'+x;
		elem=document.getElementById(x);
		elem.getElementsByClassName('test__inner')[0].classList.add('hidden');
		elem.getElementsByClassName('test__answer')[0].classList.remove('hidden');
		t1=result[y]/total[y];
		p1=t1.toFixed(2)*100;
		p2=100-p1;
		w1=10*p1;
			w2=10*p2;
		if(w1<100){
			w1=100;
		}
		if(w2<100){
			w2=100;
		}
		bar1_box=elem.getElementsByClassName('test__answer')[0].querySelectorAll('[data-a="0"]')[0];
		bar2_box=elem.getElementsByClassName('test__answer')[0].querySelectorAll('[data-a="1"]')[0];
		bar1_box.getElementsByClassName('item__percent')[0].innerHTML=p1+'%';
		bar2_box.getElementsByClassName('item__percent')[0].innerHTML=p2+'%';
		bar1_box.getElementsByClassName('item__bar')[0].style.width='100px';
		bar2_box.getElementsByClassName('item__bar')[0].style.width='100px';
		if(w1>w2){
			bar1_box.getElementsByClassName('item__bar')[0].style.background='rgb(132, 197, 154)';
			bar2_box.getElementsByClassName('item__bar')[0].style.background='rgb(2, 113, 119)';
		}else{
			bar1_box.getElementsByClassName('item__bar')[0].style.background='rgb(2, 113, 119)';
			bar2_box.getElementsByClassName('item__bar')[0].style.background='rgb(132, 197, 154)';
		}
		setTimeout(() => bar1_box.getElementsByClassName('item__bar')[0].style.width=w1+'px', 700);
		setTimeout(() => bar2_box.getElementsByClassName('item__bar')[0].style.width=w2+'px', 700);
	}
