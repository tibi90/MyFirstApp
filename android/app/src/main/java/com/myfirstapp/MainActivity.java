package com.myfirstapp;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.view.ViewGroup.LayoutParams;
import android.view.Gravity;
import android.graphics.Color;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Make sure window is visible
        getWindow().setBackgroundDrawableResource(android.R.color.white);
        
        TextView tv = new TextView(this);
        tv.setText("Hello World!");
        tv.setTextSize(30);
        tv.setTextColor(Color.BLACK);
        tv.setGravity(Gravity.CENTER);
        tv.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        
        setContentView(tv);
    }
}