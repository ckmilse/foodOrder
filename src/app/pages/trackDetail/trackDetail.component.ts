import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppHttp} from './../../services/appHttp';
import {Point, Link, Node} from './../../common/someBasicClass';
import * as d3 from 'd3';

@Component({
    selector: 'track-detail',
    providers: [
        AppHttp
    ],
    styleUrls: ['./trackDetail.component.scss'],
    templateUrl: './trackDetail.component.html'
})
export class TrackDetailComponent implements OnInit {
    public traceId = '';
    public traceDetail = {};
    public traceMap = {
        list: []
    };
    public traceArray = [];
    public reactArray = [];
    public linkArray = [];
    public tableList = [];
    public maxTime = 0;
    public minStartTime = 0;
    public treeCount = {};
    public timeLineSvg: any;
    public transform: any;
    public mapConfig = {
        svgHeight: 500,
        svgWidth: 1000,
        rectHeight: 50,
        rectMarginLeft: 50,
        fontSizeWidth: 6,
        depthHeight:80
    }
    constructor(
        private route: ActivatedRoute,
        private appHttp: AppHttp
    ) {

    }
    public ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            // console.log(params);
            this.traceId = params.traceId;
            this.initPage();
        });
    }
    public ngAfterContentInit() {
        // this.xAxis = d3.select('#traceMap')
        let width = this.mapConfig.svgWidth;
        let height = this.mapConfig.svgHeight;
        // let reactHeight = 22;
        // let rectPadding = 4;
        //画布周边的空白
        // let padding = { left: 0, right: 0, top: 20, bottom: 20 };


        $('#traceMapCon').empty();
        this.timeLineSvg = d3.select('#traceMapCon')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g');
        d3.select('#traceMapCon svg').call(d3.zoom().scaleExtent([0.5, 2]).on('zoom', this.zoomed));

    }
    public initPage() {

        this.appHttp.getData('proTraceDetailApi', {
            traceId: this.traceId
        })
            .subscribe((data: any) => {
                this.traceDetail = data.data;
                let temp = JSON.parse(data.data.callChainTree);
                // console.log(temp);
                this.recursiveTree(temp['0']);
                //处理timeLine相关逻辑
                this.produceTableData(); //只产生数据，渲染交给框架
                //处理拓扑图相关逻辑
                this.traceMap.list = this.tableList;
                this.produce(this.traceMap.list);
                this.drawSVG();
            });
    }
    public changeShow(itemMo, index) {
        itemMo.toogleChild = !itemMo.toogleChild;
        let indexMo = index;
        // console.log(indexMo);
        for (let i = indexMo + 1; i < this.traceMap.list.length; i++) {
            if (i == indexMo + 1) {
                this.traceMap.list[i].ifHidden = !this.traceMap.list[i].ifHidden;
            }
            if (this.traceMap.list[i].depth > itemMo.depth) {
                this.traceMap.list[i].ifHidden = this.traceMap.list[indexMo + 1].ifHidden;
            }
            if (i > indexMo && this.traceMap.list[i].id != itemMo.id && this.traceMap.list[i].depth == itemMo.depth) {
                break;
            }
        }
    }
    private drawSVG() {
        try {
            //画布大小
            if (!this.traceMap.list) {
                return
            }
            // viewBox='0 0 470 1400'
            // preserveAspectRatio='none'

            // this.transform = d3.zoomTransform(this.timeLineSvg.node());

            // var xScale = d3.scaleLinear()
            //     .domain([0, 50])
            //     .range([0, width - padding.left - padding.right]);
            // //y轴的比例尺
            // var yScale = d3.scaleLinear()
            //     .domain([0, dataset.length])
            //     .range([0, height - padding.top - padding.bottom]);

            this.drawRects(this.reactArray, this.timeLineSvg);
            this.drawLines(this.linkArray, this.timeLineSvg);
            // console.log(lineDemo);

        } catch (e) {
            console.log(e);
        }
    }
    //递归遍历 树形结构，生成this.traceArray
    private recursiveTree(tree: any) {

        if (tree.attr) {
            this.traceArray.push(tree.attr);
        }

        for (let key in tree.children) {
            this.recursiveTree(Object.assign(tree.children[key], { pid: key }));
        }
    }

    private produce(traceArray) {

        try {
            let tempNodes = [];
            let tempNodeStr = []; //以serviceName为标识，存储已经有的node，便于判断是否已存在
            let tempLinks = [];
            let tempLinkStr = [];//以link两端serviceName为标识，便于判断是否已存在
            let treeCount = []; //用来记录每一层 树形结构的情况

            let rectHeight = this.mapConfig.rectHeight;
            let rectMarginLeft = this.mapConfig.rectMarginLeft;
            let fontSizeWidth = this.mapConfig.fontSizeWidth;
            let depthHeight = this.mapConfig.depthHeight;

            this.traceArray.forEach((item, index, arr) => {

                //处理节点，如果节点没有，则添加一个
                if (tempNodeStr.indexOf(item.serviceName) == -1) {

                    let depth = item.rpcId.split('.').length;
                    item.depth = depth;
                    tempNodeStr.push(item.serviceName);
                    if (!treeCount[depth]) {
                        treeCount[depth] = {
                            nodeCount: 0,
                            leftEnd: 0,
                            leftCount: 0
                        };
                    }

                    let id = '';
                    let height = rectHeight;
                    let value = item.serviceName;
                    let width = item.serviceName.length * fontSizeWidth + 40;
                    let treePosition = {
                        depth: depth,
                        left: treeCount[depth].nodeCount + 1
                    };
                    let position = new Point(treeCount[depth].leftEnd, depth * depthHeight);
                    treeCount[depth].nodeCount = treeCount[depth].nodeCount + 1;
                    treeCount[depth].leftEnd = treeCount[depth].leftEnd + width + rectMarginLeft;
                    let tempNodeItem = new Node(
                        id,
                        position,
                        height,
                        value,
                        width,
                        treePosition);
                    tempNodes.push(tempNodeItem);
                }
                //找到父节点
                let parentNode = tempNodes.find((nodeItem, nodeIndex, nodesArr) => {
                    return nodeItem.value == item.invokerName;
                });

                if (!parentNode) {
                    return
                }

                //找到子节点--即自身
                let childNode = tempNodes.find((nodeItem, nodeIndex, nodesArr) => {
                    return nodeItem.value == item.serviceName;
                });
                // +++to+++ 这是随机写的，no meaning
                let tempLinkTag = parentNode.value + '+++to+++' + childNode.value;
                //判断link是否存在，不存在，则新建，存在则count+1
                if (tempLinkStr.indexOf(tempLinkTag) == -1) {
                    tempLinks.push(new Link(tempLinkTag, parentNode, childNode));
                    tempLinkStr.push(tempLinkTag);
                } else {
                    let link = tempLinks.find((linkItem, linkIndex, linksArr) => {
                        return linkItem.tag == tempLinkTag;
                    });
                    if (link && link.count) {
                        link.count = link.count + 1;
                    }

                }

            });

            this.reactArray = tempNodes;
            this.linkArray = tempLinks;
            //将每一层节点进行位移，尽量居中显示，使图像好看一点
            // 原理是找到最宽的那一层，将其它层，对照其进行位移
            let maxWidth = 1000;
            treeCount.forEach((treeCountItem) => {
                if (treeCountItem && treeCountItem.leftEnd && treeCountItem.leftEnd > maxWidth) {
                    maxWidth = treeCountItem.leftEnd;
                }
            });
            this.reactArray.forEach((react, index) => {
                // console.log(react);
                // react.position.position_x = react.position.position_x;
                react.position.position_x = react.position.position_x + ((maxWidth - treeCount[react.treePosition.depth].leftEnd) / 2);
                // ]);
            });

        } catch (e) {
            console.log(e);
        }


    }

    private zoomed() {
        try {
            d3.select('#traceMapCon g').attr("transform", d3.event.transform);
        } catch (e) {
            console.log(e);
        }

    }

    private drawRects(rectData, svg) {
        let rects = svg.selectAll('.MyRect')
            .data(rectData)
            .enter()
            .append('rect')
            .attr('class', 'MyRect')
            .attr('y', function(d, i) {
                return d.position.position_y
                // return (100 * i + rectPadding / 2) - 15;
            })
            .attr('x', function(d, i) {
                return d.position.position_x
                // return d.position_x - (d.value + '').length * 4;
            })
            .style('fill', function(d) {
                return 'white'
            })
            .style('stroke', function(d) {
                return 'black'
            })
            .style('stroke-width', function(d) {
                return '1px'
            })
            .attr('width', function(d) {
                return d.width;
                // return (d.value + '').length * 8
            })

            .attr('height', function(d) {
                return d.height
                // return height - padding.top - padding.bottom - yScale(d);
            });


        let texts = svg.selectAll('.MyText')
            .data(rectData)
            .enter()
            .append('text')
            .attr('class', 'MyText')
            .attr('y', function(d, i) {
                return d.position.position_y + 10
                // return (100 * i + rectPadding / 2) - 15;
            })
            .attr('x', function(d, i) {
                return d.position.position_x
                // return d.position_x - (d.value + '').length * 4;
            })
            .attr('dx', function() {
                return 15;
            })
            .attr('dy', function(d) {
                return 20;
            })
            .text(function(d) {
                // alert(d.value);
                return d.value;
            });
    }

    private drawLines(lineData, svg) {
        let thePaths = svg.selectAll('.MyLine')
            .data(lineData)
            .enter()
            .append('path')
            .attr('class', 'MyLine')
            .attr('x', '0')
            .attr('y', '0')
            .attr('d', function(d) {
                // getEndPoint
                // return 'M' + d.start.getSrcPoint().getString() + ' Q' + d.end.getEndPoint().getString() + ',' + d.end.getEndPoint().getString();
                // return 'M' + d.start.getSrcPoint().getString() + ' Q' + d.end.getEndPoint().getString().replace(',', ' ') + ' ' + d.end.getEndPoint().getString().replace(',', ' ');
                return 'M' + d.start.getSrcPoint().getString() + ' L' + d.end.getEndPoint().getString().replace(',', ' ');

            })
            .attr('stroke', function(d) {
                return '#000000';
            })
            .attr('fill', function(d) {
                return 'none';
            })
            .attr('style', function(d) {
                return 'stroke-width:2px';
            })
            .attr('marker-end', function(d) {
                return 'url(#arrow)';
            });

        let theLineTexts = svg.selectAll('.MyLineText')
            .data(lineData)
            .enter()
            .append('text')
            .attr('class', 'MyLineText')
            // .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
            .attr('x', function(d, i) {
                return d.getMidPoint().position_x - 10;

            })
            .attr('y', function(d, i) {
                return d.getMidPoint().position_y - 10;
                // return (d.from.split(' ')[1] * 1 + d.to.split(' ')[1] * 1) / 2;
            })
            .attr('dx', function() {
                return 15;
            })
            .attr('dy', function(d) {
                // console.log(d);
                return 20;
            })
            .text(function(d) {
                // alert(d.value);
                return d.count + '';
            });

    }

    private produceTableData() {
        //找到最大的时间间隔
        this.minStartTime = this.traceArray[0].startTime;
        this.traceArray.forEach((item) => {
            let endTime = item.startTime + (item.duration * 1000000) - this.minStartTime;
            this.maxTime = (endTime > this.maxTime) ? endTime : this.maxTime;
        });
        //遍历，产生this.tableList
        this.traceArray.forEach((item: any, index, ) => {
            try {
                this.tableList.push({
                    width: ((item.duration * 1000000) / this.maxTime) * 100 + '%',
                    depth: item.rpcId.split('.').length,
                    rpcId: item.rpcId,
                    duration: item.duration,
                    id: item.rpcId,
                    hasChild: this.traceArray[index + 1] ? (this.traceArray[index + 1].rpcId.startsWith(item.rpcId)) : false,
                    toogleChild: false,
                    // duration: item.duration,
                    type: item.type,
                    statusCode: item.resultType || '200',
                    method: item.methodName || 'noMethod',
                    remote_ip: item.ip,
                    idc: item.idc,
                    size: '1kb',
                    ifHidden: false,
                    moduleName: item.service || (item.serviceName),
                    left: ((item.startTime - this.minStartTime) / this.maxTime) * 100 + '%'
                });

            } catch (e) {
                console.log(e);
            }
        });

        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
}
