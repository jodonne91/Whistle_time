var schedule = [];


$(function(){


	$('#submit-time').on('click', function(){
		//console.log('submit clicked');
		var time = $('#time-entry').val();
		var time_zone = getTimeZone();
		var table_row_html = createTableRow(time, time_zone);

		$('.time-table').append(table_row_html);

		deleteButtonListener();
	});

	$('#send-email').on('click', function(){
		
	})

});

var getTimeZone = function()
{
	if ( $('.time-zone-select').find('#1').is(':checked') )
	{
		return 'eastern';
	}
	if ( $('.time-zone-select').find('#2').is(':checked') )
	{
		return 'central';
	}
	if ( $('.time-zone-select').find('#3').is(':checked') )
	{
		return 'mountain';
	}
	if ( $('.time-zone-select').find('#4').is(':checked') )
	{
		return 'pacific';
	}
}

var modifyTime = function(input_time, offset)
{
	//converts hours to a number, checks AM or PM, and returns reader friendly time
	var output_time;
	var time = (input_time[0] + input_time[1])*1;

	// if ( $('#dst').is(':checked') )
	// {
	// 	offset++;
	// }

	adjusted_time = time + offset;  

	console.log(adjusted_time, offset)	//debugging

	if ( adjusted_time > 24)
	{
		output_time = adjusted_time - 24 + ':' + input_time[3] + input_time[4] + ' AM';
	}
	else if ( adjusted_time === 24 )
	{
		output_time = 12 + ':' + input_time[3] + input_time[4] + ' AM';
	}
	else if ( adjusted_time > 12 )
	{
		output_time = adjusted_time - 12 + ':' + input_time[3] + input_time[4] + ' PM';
	}
	else if ( adjusted_time === 12 )
	{
		output_time = adjusted_time + ':' + input_time[3] + input_time[4] + ' PM';
	}
	else if ( adjusted_time < 0 ) 
	{
		output_time = adjusted_time + 12 + ':' + input_time[3] + input_time[4] + ' PM'
	}
	else if ( adjusted_time == 0)
	{
		output_time = adjusted_time + 12 + ':' + input_time[3] + input_time[4] + ' AM'
	}
	else
	{
		output_time = adjusted_time + ':' + input_time[3] + input_time[4] + ' AM';
	}

	return output_time;
}

var convertTime = function(input_time, time_zone)
{
	var ET, CT, MT, PT;

	switch (time_zone)
	{
		case 'eastern':
			ET = modifyTime(input_time, 0);
			CT = modifyTime(input_time, -1);
			MT = modifyTime(input_time, -2);
			PT = modifyTime(input_time, -3);
			break;
		case 'central':
			ET = modifyTime(input_time, 1);
			CT = modifyTime(input_time, 0);
			MT = modifyTime(input_time, -1);
			PT = modifyTime(input_time, -2);
			break;
		case 'mountain':
			ET = modifyTime(input_time, 2);
			CT = modifyTime(input_time, 1);
			MT = modifyTime(input_time, 0);
			PT = modifyTime(input_time, -1);
			break;
		case 'pacific':
			ET = modifyTime(input_time, 3);
			CT = modifyTime(input_time, 2);
			MT = modifyTime(input_time, 1);
			PT = modifyTime(input_time, 0);
			break;
	}

	return [ET, CT, MT, PT];
	
}

var createTableRow = function(input_time, time_zone)
{
	//check if time is valid
	if ( input_time.length == 0 )
	{
		alert('time is not valid');
		return;
	}

	console.log(input_time);  //debugging

	var time_arr = convertTime(input_time, time_zone);

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