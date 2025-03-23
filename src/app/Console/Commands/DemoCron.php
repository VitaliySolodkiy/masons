<?php

namespace App\Console\Commands;

use App\Mail\SubscribeMail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DemoCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $products = Product::orderBy('created_at', 'DESC')->limit(5)->get();
        $users = User::all();
        foreach ($users as $user) {
            Mail::to($user->email)->send(new SubscribeMail($products, $user));
        };
        Log::info('The mail was sent'); //запишется в файл storage\logs\laravel.log
        return Command::SUCCESS;
    }
}
