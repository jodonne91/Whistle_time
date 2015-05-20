var schedule = [];


$(function(){

	createTimeSelect();

	$('#send-email').on('click', function(){

	})

	$(".dropdown-menu").find('a').on('click', function(e){
		e.preventDefault();
		console.log($(this).attr('id'));
		var time = $(this).attr('id');
		var time_zone = getTimeZone();
		var duration = getDuration();
		var table_row_html = createTableRow(time, time_zone, duration);
		
		$('.time-table').append(table_row_html);

		deleteButtonListener();
	});



});

var getDuration = function()
{
	if ( $('#duration-select').find('#1').is(':checked') )
	{
		return 15;
	}
	if ( $('#duration-select').find('#2').is(':checked') )
	{
		return 30;
	}
	if ( $('#duration-select').find('#3').is(':checked') )
	{
		return 45;
	}
	if ( $('#duration-select').find('#4').is(':checked') )
	{
		return 60;
	}
}

var getTimeZone = function()
{
	if ( $('#time-zone-select').find('#1').is(':checked') )
	{
		return 'eastern';
	}
	if ( $('#time-zone-select').find('#2').is(':checked') )
	{
		return 'central';
	}
	if ( $('#time-zone-select').find('#3').is(':checked') )
	{
		return 'mountain';
	}
	if ( $('#time-zone-select').find('#4').is(':checked') )
	{
		return 'pacific';
	}
}

var modifyTime = function(input_time, offset, duration)
{
	//converts hours to a number, checks AM or PM, and returns reader friendly time
	var output_time;
	var hour = (input_time[0] + input_time[1])*1;
	var minute = (input_time[3] + input_time[4])*1;
	var end_hour;
	var end_minute;

	hour = hour + offset;
	end_hour = hour;
	end_minute = minute + duration;  


	console.log('hour: ' + hour, 'minute: ' + minute);

	if ( end_minute >= 60 )
	{
		end_hour++;
		end_minute -= 60;
	}

	if ( minute < 10 )
	{
		minute = '0' + minute;
	}
	else
	{
		minute = minute + '';
	}

	if ( end_minute < 10 )
	{
		end_minute = '0' + end_minute;
	}
	else
	{
		end_minute = end_minute + '';
	}

	console.log('end hour: ' + end_hour, 'end minute: ' + end_minute)

	if ( hour > 24)
	{
		output_time = hour - 24 + ':' + minute + ' AM' + ' - ' + end_hour + ':' + end_minute + ' AM';
	}
	else if ( hour === 24 )
	{
		output_time = 12 + ':' + minute + ' AM' + ' - ' + end_hour + ':' + end_minute + ' AM';
	}
	else if ( hour > 12 )
	{
		output_time = hour - 12 + ':' + minute + ' PM' + ' - ' + end_hour + ':' + end_minute + ' PM';
	}
	else if ( hour === 12 )
	{
		output_time = hour + ':' + minute + ' PM' + ' - ' + end_hour + ':' + end_minute + ' PM';
	}
	else if ( hour < 0 ) 
	{
		output_time = hour + 12 + ':' + minute + ' PM' + ' - ' + end_hour + ':' + end_minute + ' PM';
	}
	else if ( hour == 0)
	{
		output_time = hour + 12 + ':' + minute + ' AM' + ' - ' + end_hour + ':' + end_minute + ' AM';
	}
	else
	{
		output_time = hour + ':' + minute + ' AM' + ' - ' + end_hour + ':' + end_minute + ' AM';
	}

	return output_time;
}

var convertTime = function(input_time, time_zone, duration)
{
	var ET, CT, MT, PT;

	switch (time_zone)
	{
		case 'eastern':
			ET = modifyTime(input_time, 0, duration);
			CT = modifyTime(input_time, -1, duration);
			MT = modifyTime(input_time, -2, duration);
			PT = modifyTime(input_time, -3, duration);
			break;
		case 'central':
			ET = modifyTime(input_time, 1, duration);
			CT = modifyTime(input_time, 0, duration);
			MT = modifyTime(input_time, -1, duration);
			PT = modifyTime(input_time, -2, duration);
			break;
		case 'mountain':
			ET = modifyTime(input_time, 2, duration);
			CT = modifyTime(input_time, 1, duration);
			MT = modifyTime(input_time, 0, duration);
			PT = modifyTime(input_time, -1, duration);
			break;
		case 'pacific':
			ET = modifyTime(input_time, 3, duration);
			CT = modifyTime(input_time, 2, duration);
			MT = modifyTime(input_time, 1, duration);
			PT = modifyTime(input_time, 0, duration);
			break;
	}

	return [ET, CT, MT, PT];
	
}

var createTableRow = function(input_time, time_zone, duration)
{
	//check if time is valid
	if ( input_time.length == 0 )
	{
		alert('time is not valid; Error Code: 4Er5T10-13');
		return;
	}

	console.log(input_time, duration);  //debugging

	var time_arr = convertTime(input_time, time_zone, duration);

	console.log(time_arr);  //debugging

	var delete_button_html = '<button class="btn btn-danger btn-sm delete-button" title="delete"><span class="glyphicon glyphicon-remove"></span></button>'

	var html = '<tr><td>' + time_arr[0] + '</td><td>' + time_arr[1] + '</td><td>' + time_arr[2] + '</td><td>' + time_arr[3] + '</td><td>' + delete_button_html + '</td></tr>';
	
	return html;

}

var deleteButtonListener = function()
{
	$('.delete-button').on('click', function(){
		console.log('delete button clicked')
		$(this).parent().parent().remove();
	})
}

var createTimeSelect = function()
{
		var data_arr = [
		{
			time_show_0: '9AM',
			time_show_1: '9:00AM',
			time_show_2: '9:15AM',
			time_show_3: '9:30AM',
			time_show_4: '9:45AM',
			time_id_1: '09:00AM',
			time_id_2: '09:15AM',
			time_id_3: '09:30AM',
			time_id_4: '09:45AM'
		},
		{
			time_show_0: '10AM',
			time_show_1: '10:00AM',
			time_show_2: '10:15AM',
			time_show_3: '10:30AM',
			time_show_4: '10:45AM',
			time_id_1: '10:00AM',
			time_id_2: '10:15AM',
			time_id_3: '10:30AM',
			time_id_4: '10:45AM'
		},
		{
			time_show_0: '11AM',
			time_show_1: '11:00AM',
			time_show_2: '11:15AM',
			time_show_3: '11:30AM',
			time_show_4: '11:45AM',
			time_id_1: '11:00AM',
			time_id_2: '11:15AM',
			time_id_3: '11:30AM',
			time_id_4: '11:45AM'
		},
		{
			time_show_0: '12PM',
			time_show_1: '12:00PM',
			time_show_2: '12:15PM',
			time_show_3: '12:30PM',
			time_show_4: '12:45PM',
			time_id_1: '12:00PM',
			time_id_2: '12:15PM',
			time_id_3: '12:30PM',
			time_id_4: '12:45PM'
		},
		{
			time_show_0: '1PM',
			time_show_1: '1:00PM',
			time_show_2: '1:15PM',
			time_show_3: '1:30PM',
			time_show_4: '1:45PM',
			time_id_1: '01:00PM',
			time_id_2: '01:15PM',
			time_id_3: '01:30PM',
			time_id_4: '01:45PM'
		},
		{
			time_show_0: '2PM',
			time_show_1: '2:00PM',
			time_show_2: '2:15PM',
			time_show_3: '2:30PM',
			time_show_4: '2:45PM',
			time_id_1: '02:00PM',
			time_id_2: '02:15PM',
			time_id_3: '02:30PM',
			time_id_4: '02:45PM'
		},		
		{
			time_show_0: '3PM',
			time_show_1: '3:00PM',
			time_show_2: '3:15PM',
			time_show_3: '3:30PM',
			time_show_4: '3:45PM',
			time_id_1: '03:00PM',
			time_id_2: '03:15PM',
			time_id_3: '03:30PM',
			time_id_4: '03:45PM'
		},
		{
			time_show_0: '4PM',
			time_show_1: '4:00PM',
			time_show_2: '4:15PM',
			time_show_3: '4:30PM',
			time_show_4: '4:45PM',
			time_id_1: '04:00PM',
			time_id_2: '04:15PM',
			time_id_3: '04:30PM',
			time_id_4: '04:45PM'
		},
		{
			time_show_0: '5PM',
			time_show_1: '5:00PM',
			time_show_2: '5:15PM',
			time_show_3: '5:30PM',
			time_show_4: '5:45PM',
			time_id_1: '05:00PM',
			time_id_2: '05:15PM',
			time_id_3: '05:30PM',
			time_id_4: '05:45PM'
		},
	];

	var template = Hogan.compile('<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">{{time_show_0}} <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="" id="{{time_id_1}}">{{time_show_1}}</a></li><li><a href="" id="{{time_id_2}}">{{time_show_2}}</a></li><li><a href="" id="{{time_id_3}}">{{time_show_3}}</a></li><li><a href="" id="{{time_id_4}}">{{time_show_4}}</a></li></ul></div> ');

	for ( var i = 0 ; i < data_arr.length ; i++ )
	{	
    	var output = template.render(data_arr[i]);
    	$('#time-select').append(output);
	}
}