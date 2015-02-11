<style type="text/css">
a.company{
	text-decoration: none;
	font: 600 16px sens-sarif, arial, verdana;
	color: #ff2f2f;
}
</style>
<div class="wrap" style="margin-top: 30px;margin-left: 30px;max-width:950px !important;">
	<h2>WP Subscriber Form</h2>
	<form action="<?php echo $action_url ?>" method="post">
		<input type="hidden" name="submitted" value="1" />
		<?php wp_nonce_field('sc-subscriber-form'); ?>
		<table class="form-table">
			<tbody>
				<tr valign="top">
					<th scope="row" style="width: 120px;">FeedBurner feed</th>
					<td>
						<fieldset>
							<legend class="hidden">Feedburner feed</legend>
							<label for="feedurl"><input type="text" name="feedurl" value="<?php echo $feedurl; ?>" style="width: 200px;padding: 5px;" required /></label>
							For example from url "http://feeds.feedburner.com/<strong>sharp-coders</strong>" just enter sharp-coders
						</fieldset>
					</td>
				</tr>
				<tr valign="top">
					<th scope="row" style="width: 120px;">Heading Text</th>
					<td>
						<fieldset>
							<legend class="hidden">Heading Text</legend>
							<label for="feedurl"><input type="text" name="heading" value="<?php echo $heading_text; ?>" style="width: 200px;padding: 5px;" required /></label>
							
						</fieldset>
					</td>
				</tr>
				<tr valign="top">
					<th scope="row" style="width: 120px;">Custom CSS for Button</th>
					<td>
						<fieldset>
							<legend class="hidden">Restrict by Users</legend>
							<label for="buttoncss"><textarea name="buttoncss" style="outline: none;width: 400px;height: 200px;padding: 5px;"><?php echo $buttoncss; ?></textarea></label>
							
						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="submit"><input type="submit" name="Submit" value="Update" /></div>
	</form>
	
	<p> For Support, Visit: <a href="http://sharp-coders.com/plugins/wp-plugins/wp-subscriber-form" target="_blank">WP Subscriber Form Support</a></p>
	<p>This Plugin is Developed by <a href="http://sharp-coders.com" target="_blank" class="company">Sharp Coders</a> - <a href="http://sharp-coders.com" target="_blank">http://sharp-coders.com</a>
	<br /><br />Friend's Blog <a href="http://apnagoogle.com" target="_blank">http://apnagoogle.com</a></p>
</div>

