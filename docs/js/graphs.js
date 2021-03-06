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
var p_base=-1;
var p_base_g=-1;

// グラフの追加
function gAppend(){
    
    var width = $("#graphs").width();
    var left_m = 80;
    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);

    var chart_g=chart.selectAll('g')
        .data(calcs)
        .enter().insert('g',".baseline")
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
        .attr('x',width-140)
        .attr('width',"32px")
        .attr('height','32px')
        .attr("class", "del-icon")
        .on('click',function(d){
            d3.event.stopPropagation();
            var dmgid=d.settings.dmgid;
            pDelete(dmgid);
        })
    chart_g.append("svg:image")
        .attr('xlink:href','css/p-icon.svg')
        .attr('y',7)
        .attr('x',width-180)
        .attr('width',"32px")
        .attr('height','32px')
        .attr("class", "p-icon")
        .on('click',function(d){
            p_base=d.settings.dmgid;
            gUpdate();
        })
        
        gUpdate();
}

// グラフの更新
function gUpdate(){
    var width = $("#graphs").width();
    var left_m = 80;
    var max=d3.max(calcs,function(d){
        return d.graph.bars[1]*1.3 / (graphs_sort.mode == 1 ? d.graph.frames : 1);
    });
    var x = d3.scaleLinear()
        .domain([0,max])
        .range([0, width-left_m]);
    
    var chart = d3.select('.chart')
        .attr('width', "100%")
        .attr('height', (calcs.length) * barHeight);
        
    var o=calcs.find(function(v){
        return (v.settings.dmgid==p_base);
    });
    
    var base = -100;
    if (o)
        base=Math.floor(o.graph.line / (graphs_sort.mode == 1 ? o.graph.frames : 1));
    
    chart.select(".baseline")
        .style("stroke", "red")
        .style("stroke-width", 3)
        .attr("x1",(base<0 ? base : x(base)+left_m))
        .attr("x2",(base<0 ? base : x(base)+left_m))
        .attr("y1", 0)
        .attr("y2", (calcs.length) * barHeight);
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
            var val=(i==0 ? 0 : arr[i-1]) / (graphs_sort.mode == 1 ? this.parentNode.__data__.graph.frames : 1)
            return x(val);
        })
        // バーの長さ
        .attr("width",function(d,i){
            // 横幅（配列にmin,cmaxの順で入っているので差分をとる）
            var arr=this.parentNode.__data__.graph.bars;
            var val=(i==0 ? arr[0] : (arr[i]-arr[i-1])) / (graphs_sort.mode == 1 ? this.parentNode.__data__.graph.frames : 1)
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
            if (isNaN(d.graph.line))
                return 0;
            else
                return x(d.graph.line / (graphs_sort.mode == 1 ? d.graph.frames : 1));
        })
        .attr("x2", function(d){
            if (isNaN(d.graph.line))
                return 0;
            else
                return x(d.graph.line / (graphs_sort.mode == 1 ? d.graph.frames : 1));
        })

    chart.selectAll('.dmg')
        .data(calcs)
//        .selectAll(".dmg")
        .attr('width', "100%")
        .text(function(d){
            return ["max "+Math.floor(d.graph.bars[1] / (graphs_sort.mode == 1 ? d.graph.frames : 1))
                ,"min "+Math.floor(d.graph.bars[0] / (graphs_sort.mode == 1 ? d.graph.frames : 1))
                ,"mean "+Math.floor(d.graph.line / (graphs_sort.mode == 1 ? d.graph.frames : 1))].join(" ");
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
        .html(function(d){
            return "<tspan>"+d.settings.desc+"</tspan>"
                +(base>0 ? "<tspan x='-90' y='40' style='fill:#5755d9;font-size:16px;'>"+((Math.floor(d.graph.line / (graphs_sort.mode == 1 ? d.graph.frames : 1))/base)*100).toFixed(2)+"%</tspan>" : '');
        });
    chart.selectAll(".del-icon")
        .attr('x',width-140);
    chart.selectAll(".p-icon")
        .attr('x',width-180);
    
}

function gOrder(mode){
    var m_left = 60;
    var s={};
    switch (mode) {
        case 0 :
            s = function(a,b){return d3.ascending(a.settings.dmgid, b.settings.dmgid);};
            break;
        case 1 :
            s = function(a,b){return d3.descending(a.graph.line / (graphs_sort.mode == 1 ? a.graph.frames : 1), b.graph.line / (graphs_sort.mode == 1 ? b.graph.frames : 1));};
            break;
        case 2 :
            s = function(a,b){return d3.descending(a.graph.bars[1] / (graphs_sort.mode == 1 ? a.graph.frames : 1), b.graph.bars[1] / (graphs_sort.mode == 1 ? b.graph.frames : 1));};
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
                g[a[j]].push({desc:calcs[i].settings.desc,line:calcs[i].graph.line,dmgid:calcs[i].settings.dmgid,frames:calcs[i].graph.frames});
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
        var f=1;
        if (graphs_sort.mode == 1){
            f=d3.sum(d.values,function(e){
                return e.frames;
            });
        }
        
        var s=d3.sum(d.values,function(e){
            return e.line;
        });
        return Math.floor(s*1.2 / f);
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
    
    chart.select(".baseline-g")
        .style("stroke", "red")
        .style("stroke-width", 3)
        .attr("x1",(p_base_g>0 ? x(p_base_g)+m_left : -1000))
        .attr("x2",(p_base_g>0 ? x(p_base_g)+m_left : -1000))
        .attr("y1", 0)
        .attr("y2", (gcalcs.length) * barHeight);
        
    chart.selectAll("g").remove();
    var chart_g=chart.selectAll('g')
        .data(gcalcs)
        .enter().insert('g',".baseline-g")
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
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(arr,function(e){
                    return e.frames;
                });
            }
            var val=d3.sum(arr,function(e,j){
                return (j<i ? e.line : 0);
            });
            return x(val / f);
        })
        .attr("width",function(d,i){
            var arr=this.parentNode.__data__.values;
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(arr,function(e){
                    return e.frames;
                });
            }
            return x(d.line / f);
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
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(arr,function(e){
                    return e.frames;
                });
            }
            var val=d3.sum(arr,function(e,j){
                return (j<i ? e.line : 0);
            });
            return x(val / f)+2;
        })
        .on('click', function (d,i) {
            pSelect(d.dmgid);
        })
        .text(function(d){
            return d.desc;
        });
    chart_g.append("text")
        .attr("x",-1*m_left)
        .attr("y",10)
        .html(function(d){
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(d.values,function(e){
                    return e.frames;
                });
            }
            return '<tspan>'+d.name+'</tspan>'
                +(p_base_g>0 ? "<tspan x='-70' y='35' style='fill:#5755d9;font-size:14px;'>"+((d3.sum(d.values,function(e){
                return e.line;
            }) / f)/p_base_g*100).toFixed(2)+'%</tspan>':'');
        });
    chart_g.append("text")
        .attr("fill","#5755d9")
        .attr("text-anchor","end")
        .attr("x",width-140)
        .attr("y",10)
        .text(function(d){
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(d.values,function(e){
                    return e.frames;
                });
            }
            return 'sum '+(d3.sum(d.values,function(e){
                return e.line;
            }) / f).toFixed(2);
        });
    chart_g.append("svg:image")
        .attr('xlink:href','css/p-icon.svg')
        .attr('y',9)
        .attr('x',width-140)
        .attr('width',"32px")
        .attr('height','32px')
        .attr("class", "p-icon")
        .on('click',function(d){
            var f=1;
            if (graphs_sort.mode == 1){
                f=d3.sum(d.values,function(e){
                    return e.frames;
                });
            }

            p_base_g=Math.floor(d3.sum(d.values,function(e){
                return e.line;
            }) / f);
            groupCreate();
        });
    
        
    axis.select("g").remove()
    axis.append("g")
        .attr("transform", "translate("+[m_left,0]+")")
        .call(d3.axisBottom(x));


}