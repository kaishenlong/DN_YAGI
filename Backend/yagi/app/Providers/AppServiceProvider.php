<?php

namespace App\Providers;

use App\Models\booking;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\City;
use App\Models\DetailRoom;
use App\Models\Hotel;
use App\Models\payment;
use App\Models\room;
use App\Models\Transaction;
use App\Models\User;
use App\Observers\bookingObserver;
use App\Observers\CartDetailObserver;
use App\Observers\CartObserver;
use App\Observers\CityObserver;
use App\Observers\DetailRoomObserver;
use App\Observers\HotelObserver;
use App\Observers\paymentObserver;
use App\Observers\RoomObserver;
use App\Observers\TransactionObserver;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        Transaction::observe(TransactionObserver::class);
        booking::observe(bookingObserver::class);
        payment::observe(paymentObserver::class);  
        room::observe(RoomObserver::class); 
        DetailRoom::observe(DetailRoomObserver::class);
        Cart::observe(CartObserver::class);
        CartDetail::observe(CartDetailObserver::class);
        User::observe(UserObserver::class);
        Hotel::observe(HotelObserver::class);
        City::observe(CityObserver::class);
    }
}
