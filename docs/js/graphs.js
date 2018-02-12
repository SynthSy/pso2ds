var calcs=[];
var gcalcs=[];
// グラフ関係の関数
var color = ["#5755d9", "#f1f1fc"];   // 積み上げ棒グラフの色
var barHeight = 44;

var axis = d3.select('.axis')
    .attr('width', "100%")
    .attr('height', barHeight)
axis.append("g")
    .attr("class", "dmgaxis")
    .attr("transform", "translate("+[80,0]+")");
var axisg = d3.select('.axis-g')
    .attr('width', "100%")
    .attr('height', barHeight);

// グラフの追加
function gAppend(){
    
    var width = $("#graphs").width();
    var left_m = 80;
    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);

    var chart_g=chart.selectAll('g')
        .data(calcs)
        .enter().append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + [left_m, i * barHeight] + ')';
        })
        .on('click', function (d,i) {
            var dmgid=d.settings.dmgid;
            pSelect(dmgid);
        });

    chart_g.append("rect")
        .attr("x",-1*left_m)
        .attr("width",width)
        .attr("height",barHeight)
        .attr("class","gselect");
        
    chart_g.selectAll(".dmgbar")
        .data(function(d){
            // barsに入っている配列を渡す(calcs.graph.bars))
            return d.graph.bars;
        })
        .enter()
        .append('rect')
        .attr("class","dmgbar")
        .attr('y', 15)
        .style("stroke", color[0])
        .style("stroke-width", 2)
        .attr('height', barHeight - 19);
        
    chart_g.append("text")
        .attr("width",width)
        .attr("height",barHeight)
        .attr("x",-1*left_m)
        .attr("y",13)
        .attr("class","gdesc");

    chart_g.append("line")
        .style("stroke", "red")
        .style("stroke-width", 3)
        .attr("y1", 8)
        .attr("y2", 44)
        .attr("class", "mean");
        
    chart_g.append("text")
        .style("fill", "white")
        .style("font-weight", "900")
        .style("font-size", "18px")
        .style("text-anchor", "start")
        .style("stroke", "#5755d9")
        .style("stroke-width", "5px")
        .attr("y", 38)
        .text("")
        .attr("paint-order","stroke")
        .attr("class", "dmg");

    chart_g.append("svg:image")
        .attr('xlink:href','css/x-icon.svg')
        .attr('y',7)
        .attr('x',width-150)
        .attr('width',"32px")
        .attr('height','32px')
        .attr("class", "del-icon")
        .on('click',function(d){
            d3.event.stopPropagation();
            var dmgid=d.settings.dmgid;
            pDelete(dmgid);
        })
        
        gUpdate();
}

// グラフの更新
function gUpdate(){
    var width = $("#graphs").width();
    var left_m = 80;

    var max=d3.max(calcs,function(d){
        return d.graph.bars[1]*1.3;
    });
    var x = d3.scaleLinear()
        .domain([0,max])
        .range([0, width-left_m]);
    
    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);

    chart.selectAll('g')
        .data(calcs).exit().remove();
        
    chart.selectAll('g')
        .data(calcs)
        //
        .selectAll(".dmgbar")
        .data(function(d){
            // barsに入っている配列を渡す(calcs.graph.bars))
            return d.graph.bars;
        })
        .attr("x",function(d,i){
            // 横位置（配列にmin,cmaxの順で入っているので自分の一つ前の値をとる）
            //return x(i == 0 ? 0:this.parentNode.__data__.min);
            var arr=this.parentNode.__data__.graph.bars;
            var val=(i==0 ? 0 : arr[i-1])
            return x(val);
        })
        // バーの長さ
        .attr("width",function(d,i){
            // 横幅（配列にmin,cmaxの順で入っているので差分をとる）
            var arr=this.parentNode.__data__.graph.bars;
            var val=(i==0 ? arr[0] : arr[i]-arr[i-1])
            return x(val);
        })
        .attr("fill", function(d, i){   // ここでグラフの色を設定する
            return color[i];
        })
        .attr("stroke-width",3)
        .attr("stroke",function(d,i){
            color[i];
        });
        

    chart.selectAll('.mean')
        .data(calcs)
        .transition()
        //.selectAll(".mean")
        .attr("x1", function(d){
            return x(d.graph.line);
        })
        .attr("x2", function(d){
            return x(d.graph.line);
        })

    chart.selectAll('.dmg')
        .data(calcs)
//        .selectAll(".dmg")
        .attr('width', "100%")
        .text(function(d){
            return ["max "+d.graph.bars[1],"min "+d.graph.bars[0],"mean "+d.graph.line].join(" ");
        });

    axis.select(".dmgaxis")
        .transition()
        .call(d3.axisBottom(x));

    chart.selectAll(".gselect")
        .data(calcs)
        .attr("x",-1*left_m)
        .attr("width",width)
        .attr("fill", function(d){
            return d.settings.dmgid==current_params.settings.dmgid ? "pink" : "#eee";
        });
    chart.selectAll(".gdesc")
        .data(calcs)
        .attr("width",width)
        .text(function(d){
            return d.settings.desc;
        });
    chart.selectAll(".del-icon")
        .attr('x',width-150)
        .text(function(d){
            return d.settings.desc;
        });
}

function gOrder(mode){
    var m_left = 60;
    var s={};
    switch (mode) {
        case 0 :
            s = function(a,b){return d3.ascending(a.settings.dmgid, b.settings.dmgid);};
            break;
        case 1 :
            s = function(a,b){return d3.descending(a.graph.line, b.graph.line);};
            break;
        case 2 :
            s = function(a,b){return d3.descending(a.graph.bars[1], b.graph.bars[1]);};
            break;
    }
    var chart = d3.select('.chart');
    
    calcs.sort(s);
    chart.selectAll("g").sort(s);

    var transition = chart.transition().duration(750);

    transition.selectAll("g")
        .attr('transform', function(d, i) {
            return 'translate(' + [m_left, i * barHeight] + ')';
        });
}

var gcolor = ["#7f7fff", "#7fffbf","#ffff7f"];   // 積み上げ棒グラフの色
function groupCreate(){
    $("#gg").show();
    
    gcalcs=[];
    // グループの計算
    // スペース区切りで配列追加
    var g = {},a =[];
    for(var i = 0; i < calcs.length; i++) {
        if (calcs[i].settings.group !== ''){
            a=calcs[i].settings.group.split(' ');
            for(var j = 0; j < a.length; j++) {
                if (!g.hasOwnProperty(a[j])){
                    g[a[j]]=[];
                }
                g[a[j]].push({desc:calcs[i].settings.desc,line:calcs[i].graph.line,dmgid:calcs[i].settings.dmgid});
            }
        }
    }
    // オブジェクトループ
    for (var key in g) {
        gcalcs.push({name:key,values:g[key]});
    }
    
    var width = $("#graphs").width();
    var m_left = 60;

    var max=d3.max(gcalcs,function(d){
        var s=d3.sum(d.values,function(e){
            return e.line;
        });
        return s*1.2;
    });
    var x = d3.scaleLinear()
        .domain([0,max])
        .range([0, width-m_left]);

    var axis = d3.select('.axis-g')
        .attr('width', "100%")
        .attr('height', barHeight);
    var chart = d3.select('.chart-g')
        .attr('width', "100%")
        .attr('height', (gcalcs.length) * barHeight);
    
    chart.selectAll("g").remove();
    var chart_g=chart.selectAll('g')
        .data(gcalcs)
        .enter().append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + [m_left,i * barHeight] + ')';
        })
        .attr('class',"bar-g");
    chart_g.selectAll("rect")
        .data(function(d){
            return d.values;
        })
        .enter().append('rect')
        .attr('y', 15)
        .style("stroke", color[0])
        .style("stroke-width", 2)
        .attr('height', barHeight - 19)
        .attr("x",function(d,i){
            // 横幅（配列にmin,cmaxの順で入っているので差分をとる）
            var arr=this.parentNode.__data__.values;
            var val=d3.sum(arr,function(e,j){
                return (j<i ? e.line : 0);
            });
            return x(val);
        })
        .attr("width",function(d,i){
            return x(d.line);
        })
        .on('click', function (d,i) {
            pSelect(d.dmgid);
        })
        .attr("fill", function(d, i){   // ここでグラフの色を設定する
            return gcolor[i % 3];
        });
    chart_g.selectAll(".bardesc")
        .data(function(d){
            return d.values;
        })
        .enter().append('text')
        .attr("class",'bardesc')
        .attr("y",36)
        .attr("fill","black")
        .attr("x",function(d,i){
            // 横幅（配列にmin,cmaxの順で入っているので差分をとる）
            var arr=this.parentNode.__data__.values;
            var val=d3.sum(arr,function(e,j){
                return (j<i ? e.line : 0);
            });
            return x(val)+2;
        })
        .on('click', function (d,i) {
            pSelect(d.dmgid);
        })
        .text(function(d){
            return d.desc;
        });
    chart_g.selectAll(".gname")
        .data(gcalcs)
        .enter().append("text")
        .attr("class",'gname')
        .attr("x",-1*m_left)
        .attr("y",13)
        .text(function(d){
            return d.name;
        });
        
    axis.select("g").remove()
    axis.append("g")
        .attr("transform", "translate("+[m_left,0]+")")
        .call(d3.axisBottom(x));


}