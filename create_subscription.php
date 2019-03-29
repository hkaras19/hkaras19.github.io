<?php // Create a customer using a Stripe token

// If you're using Composer, use Composer's autoload:
require_once('vendor/autoload.php');

// Be sure to replace this with your actual test API key
// (switch to the live key later)
\Stripe\Stripe::setApiKey("sk_test_1Z0L0PoPJO3Cj9flJFgFRNt0");

try
{
  $customer = \Stripe\Customer::create([
    'email' => $_POST['stripeEmail'],
    'source'  => $_POST['stripeToken'],
  ]);

  $subscription = \Stripe\Subscription::create([
    'customer' => $customer->id,
    'items' => [['plan' => 'weekly_box']],
  ]);

  if ($subscription->status != 'incomplete')
  {
    header('Location: thankyou.html');
  }
  else
  {
    header('Location: payment_failed.html');
    error_log("failed to collect initial payment for subscription");
  }
  exit;
}
catch(Exception $e)
{
  header('Location:oops.html');
  error_log("unable to sign up customer:" . $_POST['stripeEmail'].
    ", error:" . $e->getMessage());
}