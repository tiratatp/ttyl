var FeedModel = function(){
	var data= [
			{id:1,viewType:_cons.I_MET_WHOM, leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{id:2,viewType:_cons.WHO_MET_ME, leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{id:3,viewType:_cons.FRI_MET_WHOM, leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{id:4,viewType:_cons.WHO_MET_FRI, leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{id:5,viewType:_cons.I_MET_WHOM, leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{id:6,viewType:_cons.I_MET_WHOM, leftImage:'ggf.JPG', title:"You have met Mr.P!" }
	];
	
	this.getData = function(){
		return data;
	};
	
}
