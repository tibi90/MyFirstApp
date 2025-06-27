package com.myfirstapp;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.view.Gravity;
import android.graphics.Color;
import android.widget.LinearLayout;

public class SimpleMainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Create layout programmatically to avoid any resource dependencies
        LinearLayout layout = new LinearLayout(this);
        layout.setBackgroundColor(Color.WHITE);
        layout.setGravity(Gravity.CENTER);
        
        TextView textView = new TextView(this);
        textView.setText("Hello World!");
        textView.setTextSize(32);
        textView.setTextColor(Color.BLACK);
        
        layout.addView(textView);
        setContentView(layout);
    }
}