
var init_params = {
    settings:{
        atktype:0,
        group:"",
        desc:"b(OxO)n",
        dmgid:0
    },
    player:{
        atk:1500,
        dex:600,
        critical:5
    },
    weapon:{
        atk:1000,
        elm:60,
        op:0,
        potentials:[
            {critical:false,rate:0}
        ]
    },
    equips:{
        unitsop:0,
        rings:[
            {critical:false,rate:0}
        ]
    },
    enemy:{
        def:315,
        dex:414,
        partrate:1.0,
        elmrate:1.0
    },
    others:{
        any_r:0,
        pa:100,
        padex:100,
        skills:{nz:1},
        elconv:0,
        wondreacter:{skill:0,m_atk:0},
        baseselect:[4],
        buffbase:0,
        buffs:[
            {rate:1.0,base:0}
        ]
    },
    graph: {
        bars : [564,585],
        line : 575
    }
};

var current_params;

function pAdd(){
    if (calcs.length==0) {
        $.guid=0;
        calcs.push($.extend(true,{},init_params));
        current_params=calcs[calcs.length-1];
    }else{
        calcs.push($.extend(true,{},current_params));
        current_params=calcs[calcs.length-1];
        $.guid++;
        dmg_calc.params=current_params;
    }
    current_params.settings.dmgid=$.guid;
    gAppend();
}
pAdd();

function pInit(){
    var dmgid = current_params.settings.dmgid;
    current_params=$.extend(true,{},init_params);
    current_params.settings.dmgid=dmgid;
    dmg_calc.params=current_params;
    
    var idx = calcs.findIndex(function(d){
        return d.settings.dmgid==dmgid;
    });
    
    calcs.splice(idx,1,current_params);
}

function pSelect(dmgid){
    var idx=0;
    if (dmgid==null){
        current_params=calcs[0];
        dmg_calc.params=current_params;
        return 0;
    }
    
    if (current_params.settings.dmgid!==dmgid){
        idx = calcs.findIndex(function(d){
            return d.settings.dmgid==dmgid;
        });
        current_params=calcs[idx];
        dmg_calc.params=current_params;
    }
}

// html記述を簡略化するためにcomponentを使う
// range-text   親側でv-modelを記述する
Vue.component('range-text', {
    props: {
        "name":String,
        "arrid":Number,
        "max":Number,
        "min":Number,
        "step":Number,
        "value":null,
        "statuslabel":{
            type:Boolean,
            default: false
        },
        "rateswitch":{
            type:Boolean,
            default:false
        }
    },
    template: '\
        <div class="form-group">\
            <h5 class="col-10">{{name}}</h5>\
            <div v-if="rateswitch" class="col-2">\
                <button v-if="arrid==0" class="btn btn-success wh100" v-on:click="add">追加</button></h5>\
                <button v-if="arrid>0" class="btn btn-error wh100" v-on:click="remove">削除</button></h5>\
            </div>\
            <div class="col-8">\
                <input type="range" class="input-lg slider" ref="input" :max="max" :min="min" :step="step" :value="value" @input="updateValue">\
            </div>\
            <div class="col-2">\
                <input type="text" class="form-input input-lg" ref="input" :value="value" @input="updateValue">\
            </div>\
            <div v-if="statuslabel" class="col-2">\
                <label class="label label-lg center wh100">ステ</label>\
            </div>\
            <slot></slot>\
        </div>',
    methods:{
        updateValue:function(e){
            this.$emit('input',e.target.value);
            if (this.name.match(/バフ/))
                this.$emit('newbase');
        },
        add:function(){
            this.$emit('addarray');
        },
        remove:function(){
            this.$emit('removearray');
        }
    }
});
// header-toggle   ヘッダーとトグルの合わせ
Vue.component('header-toggle', {
    props: {
        "name":String,
        "summary":String
    },
    template: '\
        <div class="form-group bg-gray">\
            <h3 class="col-6">{{ name }}</h3>\
            <h6 class="col-5" style="white-space: pre;">{{ summary }}</h6>\
            <div class="col-1">\
                <label class="btn btn-primary wh100">\
                    <slot></slot>\
                </label>\
            </div>\
        </div>'
});
// version   バージョン表記など
Vue.component('version', {
    props: {
        "history":Array
    },
    template: '\
        <div id="popup">\
            <button class="btn" style="display:block;margin:0 0 0 auto;" id="close">×</button>\
            <div class="form-horizontal">\
                <div class="form-group">\
                    <h4 class="col-9">このシミュについて</h4>\
                    <div class="col-3">\
                        作者:<a href="https://twitter.com/usousuke" target="_blank">@usousuke</a>\
                    </div>\
                </div>\
            </div>\
            <p>\
                <a href="https://twitter.com/6elz" target="_blank">@6elz</a>氏の<a href="http://4rt.info/psod/">http://4rt.info/psod/</a>を参考に作成しました。<br>\
                改めて@6elz氏お礼申し上げます。私個人の勉強という側面が大きいのですが、公開の許可を頂けて非常に感謝しております。\
            </p>\
            <h4>コンセプト</h4>\
            <p>\
                自分がpso2を辞めたときのためにできるだけ単純に作りました。<br>\
                単純な倍率系が増えたくらいでは変更しなくてもいいくらいに作っています。<br>\
            </p>\
            <h4>個人的な改良点</h4>\
            <p>\
                <strong>クリティカル時の倍率上昇系をいじれるようにしています。</strong>これをしたかったのがほとんどです。<br>\
                倍率系の存在場所が増え、任意倍率で調整するのが厳しくなってきたので<strong>武器潜在の倍率、リング倍率を任意に増やせるように</strong>しています。\
            </p>\
            <section class="form-horizontal">\
                <h3 class="col-12 bg-gray">VERSION</h3>\
                <div class="form-group" v-for="v in history">\
                    <div class="col-2 center bg-primary">{{ "ver." + v.ver.toFixed(2)}}</div>\
                    <div style="padding-left:10px;white-space: pre;flex:1;">{{ v.desc }}</div>\
                    <div class="col-2 center">{{ v.date }}</div>\
                </div>\
            </section>\
        </div>'
});

var graphs_sort=new Vue({
    el:"#sort",
    data: {
        sort:0
    }
});
var graphs_sort_g=new Vue({
    el:"#sort-g",
    data: {
        sort:0
    }
});

// data.params内に指定したオブジェクトを変数、htmlでのやり取りを双方向に反映する
// またComputedで常にダメージ計算までする
var dmg_calc = new Vue({
    el: '#params',
    data: {
        params:current_params,
        version:v,
        toggle:{
            settings:false,
            pleyer:false,
            weapon:false,
            equips:false,
            enemy:false,
            paany:false,
            buff:false,
            skills:false
        }
    },
    computed: {
        // 攻撃属性の変換
        atkstring : function(){
            return ['blow','shot','magical','tech'][this.params.settings.atktype]
        },
        // 表示用サマリー(ダメージ)
        summary_d : function(){
            return ['MAX '+this.dmg_max,'MIN '+this.dmg_min,'MEAN '+this.dmg_mean].join(' ')
        },
        // 表示用サマリー(プレイヤー)
        summary_p : function(){
            return ['素手 '+this.params.player.atk,'技量 '+this.params.player.dex,'クリティカル率 '+this.params.player.critical+'%'].join(' ')
        },
        // 表示用サマリー(武器)
        summary_w : function(){
            var potentials = this.summary_w_potentials;
            return ['攻撃力 '+this.params.weapon.atk,'属性 '+this.params.weapon.elm,'OP(固定値)＋'+this.params.weapon.op].join(' ') + '\r\n' +
                   ['倍率×'+potentials.r.toFixed(2),' クリティカル倍率×'+potentials.cr.toFixed(2)].join(' ');
        },
        // 武器潜在S級OP倍率
        summary_w_potentials : function(){
            var ef = {r:1,cr:1};
            
            for (var i=0;i<this.params.weapon.potentials.length;i++){
                if (this.params.weapon.potentials[i].critical)
                    ef.cr *= (100+Number(this.params.weapon.potentials[i].rate))/100;
                else
                    ef.r *= (100+Number(this.params.weapon.potentials[i].rate))/100;
            }
            
            return ef;
        },
        // 表示用サマリー(ユニット)
        summary_q : function(){
            var rings = this.summary_q_rings;
            return ['ユニOP&リングステ＋'+(this.params.equips.unitsop),'\r\n倍率×'+rings.r.toFixed(2),' クリティカル倍率×'+rings.cr.toFixed(2)].join(' ');
        },
        // リング倍率
        summary_q_rings : function(){
            var ef = {r:1,cr:1};
            
            for (var i=0;i<this.params.equips.rings.length;i++){
                if (this.params.equips.rings[i].critical)
                    ef.cr *= (100+Number(this.params.equips.rings[i].rate))/100;
                else
                    ef.r *= (100+Number(this.params.equips.rings[i].rate))/100;
            }
            
            return ef;
        },
        // 表示用サマリー(エネミー)
        summary_e : function(){
            return ['防御力 '+this.params.enemy.def,'技量 '+this.params.enemy.dex,'\r\n部位倍率× '+Number(this.params.enemy.partrate).toFixed(2),'属性倍率×'+Number(this.params.enemy.elmrate).toFixed(2)].join(' ')
        },
        // 表示用サマリー(PA任意倍率)
        summary_pa : function(){
            return ['PA '+this.params.others.pa,'PA技量補正 '+this.params.others.padex,'\r\n任意倍率× '+((100+Number(this.params.others.any_r))/100).toFixed(2)].join(' ');
        },
        
        // 表示用サマリー(スキル)
        summary_s : function(){
            var skillef=this.summary_s_skills;
            return ["倍率×"+skillef.r.toFixed(2),"クリティカル倍率×"+skillef.cr.toFixed(2),"\r\nステ＋"+skillef.st].join(' ');
        },
        // 表示用サマリー(バフ)
        summary_b : function(){
            var summary=[];
            for (var i=0;i<this.params.others.buffs.length;i++){
                summary.push('+'+((Number(this.params.others.buffs[i].rate)-1)*Number(this.params.others.buffs[i].base)).toFixed(2));
            }
            return summary.join(' ');
        },
        summary_s_skills : function(){
            var ef = {r:1,cr:1,st:0};
            var val;
            for (var key in this.params.others.skills){
                val=skillsId[key].ef[this.atkstring][this.params.others.skills[key]];
                
                switch (typeof val){
                    case 'string':
                        ef.st += Number(val);
                        break;
                    case 'object':
                        ef.cr *= (100+Number(val))/100;
                        break;
                    case 'number':
                        ef.r *= (100+Number(val))/100;
                        break;
                }
            }
            return ef;
        },
        // 通常倍率
        all_r:function(){
            var r = 1;
            
            r *= this.summary_q_rings.r;
            r *= this.summary_w_potentials.r;
            r *= this.summary_s_skills.r;
            r *= Number(this.params.others.pa)/100
            r *= (100+Number(this.params.others.any_r))/100;
            
            // テクとエレメントコンバージョン
            if (this.params.settings.atktype==3) {
                r *= this.params.enemy.elmrate;
                if (this.params.others.elconv>0) {
                    r *= (100+Number(this.params.weapon.elm)*0.5)/100
                }
            }
            
            return r;
        },
        // クリティカル倍率
        all_cr:function(){
            var cr = 1;
            
            cr *= this.summary_q_rings.cr;
            cr *= this.summary_w_potentials.cr;
            cr *= this.summary_s_skills.cr;
            
            return cr;
        },
        // 基礎倍率
        _r:function(){
            return this.all_r/5;
        },
        // ステ合計
        _atk:function(){
            var b = 0;
            for (var i=0;i<this.params.others.buffs.length;i++){
                b+=Number(((Number(this.params.others.buffs[i].rate)-1)*Number(this.params.others.buffs[i].base)).toFixed(2));
            }
            
            return Number(this.params.player.atk)
                +Number(this.params.weapon.op)
                +Number(this.params.equips.unitsop)
                +Number(this.summary_s_skills.st)
                +Number(b);
        },
        // ウォンドリアクター込みの武器攻撃力
        _watk:function(){
            if ((this.params.settings.atktype==0) && (this.params.others.wondreacter.skill>0)){
                return Number(this.params.weapon.atk)+Number((Number(this.params.others.wondreacter.m_atk)*0.4).toFixed(2));
            } else
                return this.params.weapon.atk;
        },
        // 素手ダメージ
        dmg_bare:function(){
            return this._atk*this.params.enemy.partrate*this._r;
        },
        // エネミー防御力によるダメージ（マイナス）
        dmg_edef:function(){
            return -this.params.enemy.def*this.params.enemy.partrate*this._r;
        },
        // 属性ダメージ
        dmg_welm:function(){
            // テクの場合属性ダメージ無し
            if (this.params.settings.atktype==3)
                return 0;
            else
                return this._watk*this.params.weapon.elm*0.01*this.params.enemy.elmrate*this._r;
        },
        // 武器最大ダメージ
        dmg_wmax:function(){
            return this._watk*this.params.enemy.partrate*this._r;
        },
        // 武器最小ダメージ
        dmg_wmin:function(){
            // ペット以外はほぼ☆１３の世界なので他の計算はとりあえずなし
            if (this.params.settings.atktype!==2)
                return this.dmg_wmax*0.9;
            else {
                // 武器90%と武器10%
                var upperlimit = this.dmg_wmax*0.9;
                var lowerlimit = this.dmg_wmax*0.1;
                // ペット技量補正
                var w_dexadjust=-50;
                // 保証値計算
                var safety=(Number(this.params.player.dex)*Number(this.params.others.padex)/100-Number(this.params.enemy.dex)+w_dexadjust)*2*this._r;
                
                // 最小ダメージは武器90%以下武器10%以上
                return Math.max(lowerlimit,Math.min(upperlimit,safety));
            }
            /*
            // 武器90%と武器10%
            var upperlimit = this.wmax*0.9;
            var lowerlimit = this.wmax*0.1;
            
            // レアで非クラフトの場合は武器90%
            if (this.paramaters.w_rarity>=7 && this.paramaters.w_bluetype==0)
                return upperlimit;
            
            // それ以外
            var w_dexadjust=0;
            
            if (this.w_bluetype<=1)
                w_dexadjust=50*(grinding[this.paramaters.w_rarity-1][this.paramaters.w_plus]-1);
            if (this.w_bluetype==2)
                w_dexadjust=50+100*(grinding[this.paramaters.w_rarity-1][this.paramaters.w_plus]-1);
            if (this.w_bluetype==3)
                w_dexadjust=100+150*(grinding[this.paramaters.w_rarity-1][this.paramaters.w_plus]-1);
            if (this.w_bluetype==4)
                w_dexadjust=150+200*(grinding[this.paramaters.w_rarity-1][this.paramaters.w_plus]-1);
            if (this.w_bluetype==5)
                w_dexadjust=-50;
            
            // 保証値計算
            var safety=(this.paramaters.p_dex*this.paramaters.pa_dex_r-this.paramaters.e_dex+w_dexadjust)*2*this._r;
            
            // 最小ダメージは武器90%以下武器10%以上
            return Math.max(lowerlimit,Math.min(upperlimit,safety));
            */
        },
        // クリティカル倍率を抜いた最大ダメージ
        dmg_max:function(){
            return Math.round(this.dmg_bare+this.dmg_welm+this.dmg_wmax+this.dmg_edef);
        },
        // クライアント時の最大ダメージ
        dmg_cmax:function(){
            return Math.round(this.dmg_max*this.all_cr);
        },
        // 最小ダメージ
        dmg_min:function(){
            return Math.round(this.dmg_bare+this.dmg_welm+this.dmg_wmin+this.dmg_edef);
        },
        // 期待値
        dmg_mean: function() {
            var mid=(this.dmg_max+this.dmg_min)/2;
            // グラフ用オブジェクトに値を追加
            this.params.graph.line=Math.round(mid+this.params.player.critical*0.01*(this.dmg_cmax-mid));
            this.params.graph.bars=[this.dmg_min,this.dmg_cmax];
            
            // ここでグラフ更新
            gUpdate();
            
            return this.params.graph.line;
        },
        version_r:function(){
            return this.version.sort(function(p,n){
                if( p.ver > n.ver ) return -1
                else return 1;
            });
        }
    },
    methods:{
        classSkills:function(className){
            return skills.filter(function(el, index, array) {
                return (el.className == className);
            });
        },
        hasClass:function(className){
            for (var key in this.params.others.skills){
                if (skillsId[key].className==className)
                    return 1;
            }
            return 0;
        },
        changeClass:function(className){
            var cs = this.classSkills(className);
            if (this.hasClass(className)){
                for (var i=0;i<cs.length;i++){
                    this.$delete(this.params.others.skills,cs[i].id);
                }
            }
            else{
                for (var i=0;i<cs.length;i++){
                    if (cs[i]["default"] !== 0)
                    this.$set(this.params.others.skills,cs[i].id,cs[i]["default"]);
                }
                $('#wrap').animate({scrollTop: $('#wrap')[0].scrollHeight}, 'slow');
            }
            return 0;
        },
        baseReset:function(){
            this.params.others.buffs.splice(0,this.params.others.buffs.length);
            this.params.others.buffs.push({rate:1.0,base:this.params.others.buffbase});
        },
        baseSelected:function(){
            var b=0;
            
            for (var i=0;i<this.params.others.baseselect.length;i++){
                switch (this.params.others.baseselect[i]){
                    case 1:
                        b+=Number(this.params.player.atk);
                        break;
                    case 2:
                        b+=Number(this.params.weapon.op);
                        break;
                    case 3:
                        b+=Number(this.params.equips.unitsop);
                        break;
                    case 4:
                        for (var j=0;j<this.params.others.buffs.length;j++){
                            b+=Number(((Number(this.params.others.buffs[j].rate)-1)*Number(this.params.others.buffs[j].base)).toFixed(2));
                        }
                        break;
                }
            }
            this.params.others.buffbase=b;
            if ((this.params.others.buffs.length==1) && (this.params.others.buffs[0].base==0)){
                this.params.others.buffs[0].base=b;
            }
            return 0;
        }
    }
});
