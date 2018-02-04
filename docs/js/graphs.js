var calcs=[];
var gcalcs=[];
// グラフ関係の関数
var color = ["#5755d9", "#f1f1fc"];   // 積み上げ棒グラフの色
var barHeight = 44;


// グラフの追加
function gAppend(){    
    var axis = d3.select('.axis')
        .attr('width', "100%")
        .attr('height', barHeight);

    var width = $("#graphs").width();
    var parentLength=$("#graphs").width();

    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);

    var chart_g=chart.selectAll('g')
        .data(calcs)
        .enter().append('g')
        .attr('transform', function(d, i) {
            return 'translate(0,' + i * barHeight + ')';
        })
        .attr('id', function(d) {
            return d.settings.dmgid;
        })
        .attr('class',"bars")
        .on('click', function (d,i) {
            var dmgid=d.settings.dmgid;
            pSelect(dmgid);
        });
    chart_g.selectAll("rect")
        .data(function(d){
            // barsに入っている配列を渡す(calcs.graph.bars))
            return d.graph.bars;
        })
        .enter()
        .append('rect')
        .attr('y', 15)
        .style("stroke", color[0])
        .style("stroke-width", 2)
        .attr('height', barHeight - 19);

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

    var desc = d3.select('.desc')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);
        
    var desc_g=desc.selectAll("g")
        .data(calcs)
        .enter().append("g")
        .attr('height', barHeight)
        .attr('width', "100%")
        .on('click', function (d,i) {
            pSelect(d.settings.dmgid);
        });

    
    desc_g.append("rect")
        .attr("width",parentLength)
        .attr("height",barHeight)
        .attr("y",function(d,i){
            return i * barHeight;
        })
        .attr("class","gselect");
        
    desc_g.append("text")
        .attr("width",parentLength)
        .attr("height",barHeight)
        .attr("y",function(d,i){
            return i * barHeight+13;
        })
        .attr("class","gdesc");
    gUpdate();
}

// グラフの更新
function gUpdate(){
    var axis = d3.select('.axis')
        .attr('width', "100%")
        .attr('height', barHeight);

    var width = $("#graphs").width();
    var parentLength=$("#graphs").width();

    var max=d3.max(calcs,function(d){
        return d.graph.bars[1]*1.3;
    });
    var x = d3.scaleLinear()
        .domain([0,max])
        .range([0, width-20]);
    
    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);

    chart.selectAll('g')
        .data(calcs)
        //
        .selectAll("rect")
        .data(function(d){
            // barsに入っている配列を渡す(calcs.graph.bars))
            return d.graph.bars;
        })
        .transition()
        .attr("x",function(d,i){
            // 横位置（配列にmin,cmaxの順で入っているので自分の一つ前の値をとる）
            //return x(i == 0 ? 0:this.parentNode.__data__.min);
            var arr=this.parentNode.__data__.graph.bars;
            var val=(i==0 ? 0 : arr[i-1])
            return x(val);
        })	
        // バーの高さ
        .transition()
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
        
    chart.selectAll('g')
        .data(calcs)
        .transition()
        .selectAll(".mean")
        .attr("x1", function(d){
            return x(d.graph.line);
        })
        .attr("x2", function(d){
            return x(d.graph.line);
        })

    chart.selectAll('g')
        .data(calcs)
        .selectAll(".dmg")
        .attr('width', "100%")
        .text(function(d){
            return ["max "+d.graph.bars[1],"min "+d.graph.bars[0],"mean "+d.graph.line].join(" ");
        });

    axis.select("g").remove()
    axis.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+[0,0]+")")
        .call(d3.axisBottom(x));

    var gdesc = d3.selectAll('.desc');

    gdesc.selectAll(".gselect")
        .data(calcs)
        .attr("width",parentLength)
        .attr("fill", function(d){
            return d.settings.dmgid==current_params.settings.dmgid ? "pink" : "#eee";
        });
    gdesc.selectAll(".gdesc")
        .data(calcs)
        .attr("width",parentLength)
        .text(function(d){
            return d.settings.desc;
        });
}

